import * as XLSX from "xlsx";

export const parseExcel = (buffer: Buffer) => {
  const workbook = XLSX.read(buffer, { type: "buffer" });

  const getSheet = (name: string) => {
    const sheet = workbook.Sheets[name];
    if (!sheet) return []; // 👈 importante: no romper si no viene

    return XLSX.utils.sheet_to_json(sheet, {
      defval: null, // 👈 evita undefined
    });
  };

  return {
    solicitudes: getSheet("solicitudes"),
    programacion: getSheet("programacion"),
    logistica: getSheet("logistica"),
    estados: getSheet("estados"),
    trazabilidad: getSheet("trazabilidad"),
  };
};