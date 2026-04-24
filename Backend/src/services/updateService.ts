// services/bulkUpdate.service.ts
import {db} from "../config/db";
import SolicitudTramites from "../models/solicitudTramites";
import Programacion from "../models/programacion";
import Logistica from "../models/logistica";
import EstadosTramites from "../models/estadosTramites";
import Trazabilidad from "../models/trazabilidad";

export const processBulkUpdate = async (data: any) => {
  const t = await db.transaction();

  try {
    // 🔹 ACTUALIZAR TRAMITADOR
    for (const row of data.solicitudes) {
      if (row.tramitadorId) {
        await SolicitudTramites.update(
          { tramitadorId: row.tramitadorId },
          {
            where: { id: row.solicitudTramiteId },
            transaction: t,
          }
        );
      }
    }

    // 🔹 PROGRAMACION
    for (const row of data.programacion) {
      await Programacion.upsert(
        {
          solicitudTramiteId: row.solicitudTramiteId,
          fechaRealizacionDiligencia: row.fechaRealizacionDiligencia,
          fechaProbableEntrega: row.fechaProbableEntrega,
          valorTramite: row.valorTramite,
          valorViaticos: row.valorViaticos,
        },
        { transaction: t }
      );
    }

    // 🔹 LOGISTICA
    for (const row of data.logistica) {
      await Logistica.upsert(
        {
          solicitudTramiteId: row.solicitudTramiteId,
          numeroGuia: row.numeroGuia,
          valorEnvio: row.valorEnvio,
          transportadoraId: row.transportadoraId,
        },
        { transaction: t }
      );
    }

    // 🔹 ESTADOS + REGLA FINALIZADO
    for (const row of data.estados) {
      const estado = await EstadosTramites.create(
        {
          solicitudTramiteId: row.solicitudTramiteId,
          estadoId: row.estadoId,
        },
        { transaction: t }
      );

      if (row.estadoId === 6) {
        await Programacion.update(
          {
            fechaFinalizacionServicio: estado.createdAt,
          },
          {
            where: { solicitudTramiteId: row.solicitudTramiteId },
            transaction: t,
          }
        );
      }
    }

    // 🔹 TRAZABILIDAD
    for (const row of data.trazabilidad) {
      await Trazabilidad.create(
        {
          solicitudTramiteId: row.solicitudTramiteId,
          descripcion: row.descripcion,
        },
        { transaction: t }
      );
    }

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};