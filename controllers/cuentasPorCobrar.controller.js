// controllers/cuentasPorCobrar.controller.js
'use strict';

const { getCuentasPorCobrar } = require('../services/cuentasPorCobrar.service');

async function cuentasPorCobrar(req, res) {
  try {
    const data = await getCuentasPorCobrar();
    res.json(data);
  } catch (err) {
    console.error('[CXC] Error:', err.message);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { cuentasPorCobrar };
