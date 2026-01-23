import { Request, Response } from 'express'
import XLSX from 'xlsx'

import Clientes from '../models/clientes'
import Municipios from '../models/municipios'
import Operaciones from '../models/operaciones'
import Entidad from '../models/entidad'
import Tramites from '../models/tramite'
import SolicitudTramites from '../models/solicitudTramites'


// ======================================================
// 📄 GENERAR PLANTILLA EXCEL CON HOJAS AUXILIARES
// ======================================================
export const generarPlantillaExcel = async (req: Request, res: Response) => {

  const dataSolicitudes = [{
    detalleSolicitud: '',
    direccionTramite: '',
    clienteId: '',
    municipiosId: '',
    operacionesId: '',
    entidadId: '',
    tramiteId: '',
    placa: '',
    matriculaInmobiliaria: '',
    documentosAportados: 'No',
    fechaEntregaResultado: ''
  }]

  const [
    clientes,
    municipios,
    operaciones,
    entidades,
    tramites
  ] = await Promise.all([
    Clientes.findAll({ attributes:['id','nombreCliente'], order:[['id','ASC']] }),
    Municipios.findAll({ attributes:['id','nombreMunicipio','departamento'], order:[['id','ASC']] }),
    Operaciones.findAll({ attributes:['id','nombreOperacion'], order:[['id','ASC']] }),
    Entidad.findAll({ attributes:['id','nombreEntidad'], order:[['id','ASC']] }),
    Tramites.findAll({ attributes:['id','nombreTramite'], order:[['id','ASC']] })
  ])

  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(dataSolicitudes), 'Solicitudes')
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(clientes.map(c=>({id:c.id, nombre:c.nombreCliente}))), 'Clientes')
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(municipios.map(m=>({id:m.id, municipio:m.nombreMunicipio, departamento:m.departamento}))), 'Municipios')
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(operaciones.map(o=>({id:o.id, operacion:o.nombreOperacion}))), 'Operaciones')
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(entidades.map(e=>({id:e.id, entidad:e.nombreEntidad}))), 'Entidades')
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(tramites.map(t=>({id:t.id, tramite:t.nombreTramite}))), 'Tramites')

  const buffer = XLSX.write(wb, { type:'buffer', bookType:'xlsx' })

  res.setHeader('Content-Disposition','attachment; filename=plantilla_solicitudes.xlsx')
  res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.send(buffer)
}


// ======================================================
// ✅ VALIDAR EXCEL (SIN GUARDAR)
// ======================================================
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

      const clienteId   = Number(row.clienteId)
      const municipioId = Number(row.municipiosId)
      const operacionId = Number(row.operacionesId)
      const entidadId   = Number(row.entidadId)
      const tramiteId   = Number(row.tramiteId)

      if (isNaN(clienteId))   errores.push({ fila:filaExcel, error:'clienteId inválido' })
      if (isNaN(municipioId)) errores.push({ fila:filaExcel, error:'municipiosId inválido' })
      if (isNaN(operacionId)) errores.push({ fila:filaExcel, error:'operacionesId inválido' })
      if (isNaN(entidadId))   errores.push({ fila:filaExcel, error:'entidadId inválido' })
      if (isNaN(tramiteId))   errores.push({ fila:filaExcel, error:'tramiteId inválido' })

      if (!await Clientes.findByPk(clienteId))   errores.push({ fila:filaExcel, error:'clienteId no existe' })
      if (!await Municipios.findByPk(municipioId)) errores.push({ fila:filaExcel, error:'municipiosId no existe' })
      if (!await Operaciones.findByPk(operacionId)) errores.push({ fila:filaExcel, error:'operacionesId no existe' })
      if (!await Entidad.findByPk(entidadId)) errores.push({ fila:filaExcel, error:'entidadId no existe' })
      if (!await Tramites.findByPk(tramiteId)) errores.push({ fila:filaExcel, error:'tramiteId no existe' })
    }

    return res.json({
      totalProcesados: rows.length,
      errores
    })

  } catch (err) {
    return res.status(500).json({ error:'Error leyendo archivo Excel' })
  }
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
    const rows:any[] = XLSX.utils.sheet_to_json(sheet)

    const creados:number[] = []
    const errores:any[] = []

    for (const [index, row] of rows.entries()) {

      const filaExcel = index + 2

      try {

        const clienteId   = Number(row.clienteId)
        const municipioId = Number(row.municipiosId)
        const operacionId = Number(row.operacionesId)
        const entidadId   = Number(row.entidadId)
        const tramiteId   = Number(row.tramiteId)

        if (
          isNaN(clienteId) ||
          isNaN(municipioId) ||
          isNaN(operacionId) ||
          isNaN(entidadId) ||
          isNaN(tramiteId)
        ){
          errores.push({ fila:filaExcel, error:'IDs inválidos o vacíos' })
          continue
        }

        const [cliente, municipio, operacion, entidad, tramite] = await Promise.all([
          Clientes.findByPk(clienteId),
          Municipios.findByPk(municipioId),
          Operaciones.findByPk(operacionId),
          Entidad.findByPk(entidadId),
          Tramites.findByPk(tramiteId)
        ])

        if (!cliente || !municipio || !operacion || !entidad || !tramite){
          errores.push({ fila:filaExcel, error:'Algún ID no existe en base de datos' })
          continue
        }

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

      } catch (err:any) {
        errores.push({ fila:filaExcel, error: err.message })
      }
    }

    res.json({
      message:'Carga masiva finalizada',
      totalProcesados: rows.length,
      creados,
      errores
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error:'Error procesando archivo Excel' })
  }
}
