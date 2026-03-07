// services/reportes.service.js
'use strict';

const { execQuery } = require('../util/hana');

async function fetchReporte(params) {
  const db = process.env.HANA_DB;
  // Ejemplo de consulta — reemplazar según reporte requerido
  const sql = `SELECT TOP 10 * FROM "${db}"."OINV"`;
  const rows = await execQuery(sql);
  return rows;
}

module.exports = { fetchReporte };
