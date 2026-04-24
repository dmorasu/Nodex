// services/bulkUpdateValidator.ts
import SolicitudTramites from "../models/solicitudTramites";
import Estados from "../models/estados";
import Tramitador from "../models/tramitador";

export const validateBulkUpdate = async (data: any) => {
  const errors: string[] = [];

  for (const [i, row] of data.solicitudes.entries()) {
    if (!row.solicitudTramiteId) {
      errors.push(`Fila ${i + 2}: falta solicitudTramiteId`);
      continue;
    }

    const solicitud = await SolicitudTramites.findByPk(
      row.solicitudTramiteId
    );

    if (!solicitud) {
      errors.push(
        `Fila ${i + 2}: solicitud ${row.solicitudTramiteId} no existe`
      );
    }
  }

  // Validar estados
  for (const [i, row] of data.estados.entries()) {
    const estado = await Estados.findByPk(row.estadoId);
    if (!estado) {
      errors.push(`Fila ${i + 2}: estadoId ${row.estadoId} no existe`);
    }
  }

  // Validar tramitador
  for (const [i, row] of data.solicitudes.entries()) {
    if (row.tramitadorId) {
      const tram = await Tramitador.findByPk(row.tramitadorId);
      if (!tram) {
        errors.push(
          `Fila ${i + 2}: tramitador ${row.tramitadorId} no existe`
        );
      }
    }
  }

  return errors;
};