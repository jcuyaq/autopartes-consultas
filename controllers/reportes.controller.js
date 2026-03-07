// controllers/reportes.controller.js
'use strict';

const { fetchReporte } = require('../services/reportes.service');

async function getReporte(req, res) {
  try {
    const data = await fetchReporte(req.query);
    res.json(data);
  } catch (err) {
    console.error('[REPORTE] Error:', err.message);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getReporte };
