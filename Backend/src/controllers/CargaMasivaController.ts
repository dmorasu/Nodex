import { Request, Response } from 'express'
import XLSX from 'xlsx'

import Clientes from '../models/clientes'
import Municipios from '../models/municipios'
import Operaciones from '../models/operaciones'
import Entidad from '../models/entidad'
import Tramites from '../models/tramite'
import SolicitudTramites from '../models/solicitudTramites'




// ===============================
// ✅ VALIDAR EXCEL (sin guardar)
// ===============================
export const validarSolicitudesExcel = async (req: Request, res: Response) => {

  if (!req.file) {
    return res.status(400).json({ error: 'Debe subir un archivo Excel' })
  }

  try {
    const workbook = XLSX.read(req.file.buffer)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows:any[] = XLSX.utils.sheet_to_json(sheet)

    const errores:any[] = []

    for (const [index, row] of rows.entries()) {

      const filaExcel = index + 2

      const cliente   = await Clientes.findByPk(Number(row.clienteId))
      const municipio = await Municipios.findByPk(Number(row.municipiosId))
      const operacion = await Operaciones.findByPk(Number(row.operacionesId))
      const entidad   = await Entidad.findByPk(Number(row.entidadId))
      const tramite   = await Tramites.findByPk(Number(row.tramiteId))

      if (!cliente)   errores.push({ fila: filaExcel, error:'clienteId no existe' })
      if (!municipio) errores.push({ fila: filaExcel, error:'municipiosId no existe' })
      if (!operacion) errores.push({ fila: filaExcel, error:'operacionesId no existe' })
      if (!entidad)   errores.push({ fila: filaExcel, error:'entidadId no existe' })
      if (!tramite)   errores.push({ fila: filaExcel, error:'tramiteId no existe' })
    }

    return res.json({
      totalProcesados: rows.length,
      errores
    })

  } catch (err) {
    return res.status(500).json({ error:'Error leyendo archivo' })
  }
}

// ======================================================
// 📄 GENERAR PLANTILLA EXCEL (BASADA EN IDS)
// ======================================================
export const generarPlantillaExcel = async (req: Request, res: Response) => {

  const data = [{
    detalleSolicitud: '',
    direccionTramite: '',
    clienteId: '',
    municipiosId: '',
    operacionesId: '',
    entidadId: '',
    tramiteId: '',
    tipoServicio: '',               // respaldo visual opcional
    placa: '',
    matriculaInmobiliaria: '',
    documentosAportados: 'No',
    fechaEntregaResultado: ''
  }]

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(data)
  XLSX.utils.book_append_sheet(wb, ws, 'Solicitudes')

  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

  res.setHeader('Content-Disposition', 'attachment; filename=plantilla_solicitudes.xlsx')
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.send(buffer)
}


// ======================================================
// 📥 CARGA MASIVA DE SOLICITUDES
// ======================================================
export const cargaMasivaSolicitudes = async (req: Request, res: Response) => {

  if (!req.file) {
    return res.status(400).json({ error: 'Debe subir un archivo Excel' })
  }

  try {
    const workbook = XLSX.read(req.file.buffer)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows: any[] = XLSX.utils.sheet_to_json(sheet)

    const creados: number[] = []
    const errores: any[] = []

    for (const [index, row] of rows.entries()) {

      const filaExcel = index + 2

      try {

        // 🔎 Conversión segura a número
        const clienteId     = Number(row.clienteId)
        const municipioId   = Number(row.municipiosId)
        const operacionId   = Number(row.operacionesId)
        const entidadId     = Number(row.entidadId)
        const tramiteId     = Number(row.tramiteId)

        if (
          isNaN(clienteId) ||
          isNaN(municipioId) ||
          isNaN(operacionId) ||
          isNaN(entidadId) ||
          isNaN(tramiteId)
        ) {
          errores.push({
            fila: filaExcel,
            error: 'Alguno de los IDs no es numérico o está vacío'
          })
          continue
        }

        // 🔎 Validar existencia
        const [cliente, municipio, operacion, entidad, tramite] = await Promise.all([
          Clientes.findByPk(clienteId),
          Municipios.findByPk(municipioId),
          Operaciones.findByPk(operacionId),
          Entidad.findByPk(entidadId),
          Tramites.findByPk(tramiteId)
        ])

        if (!cliente || !municipio || !operacion || !entidad || !tramite) {
          errores.push({
            fila: filaExcel,
            error: 'Algún ID relacionado no existe en base de datos'
          })
          continue
        }

        // 📌 Crear registro
        await SolicitudTramites.create({
          detalleSolicitud: row.detalleSolicitud?.toString().trim(),
          direccionTramite: row.direccionTramite?.toString().trim(),
          clienteId,
          municipiosId: municipioId,
          operacionesId: operacionId,
          entidadId,
          tramiteId,
          placa: row.placa?.toString().trim() || null,
          matriculaInmobiliaria: row.matriculaInmobiliaria?.toString().trim() || null,
          documentosAportados: row.documentosAportados || 'No',
          fechaEntregaResultado: row.fechaEntregaResultado
            ? new Date(row.fechaEntregaResultado)
            : null
        })

        creados.push(filaExcel)

      } catch (err: any) {
        errores.push({
          fila: filaExcel,
          error: err?.message
        })
      }
    }

    res.json({
      message: 'Carga masiva finalizada',
      totalProcesados: rows.length,
      creados,
      errores
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error procesando archivo' })
  }
}
