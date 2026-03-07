// services/cuentasPorCobrar.service.js
'use strict';

const { execQuery } = require('../util/hana');

async function getCuentasPorCobrar() {
  const db  = process.env.HANA_DB;
  const sql = `CALL "${db}"."MK_CUENTAS_POR_COBRAR_CUSTOMER"(?, ?)`;
  const rows = await execQuery(sql, ['TODOS', 'TODOS']);
  return Array.isArray(rows) ? rows : [];
}

module.exports = { getCuentasPorCobrar };
