// routes/reportes.routes.js
const router = require('express').Router();
const { getReporte } = require('../controllers/reportes.controller');

// GET /api/reportes?query=...
router.get('/', getReporte);

module.exports = router;
