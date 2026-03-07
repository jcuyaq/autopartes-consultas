// routes/cuentasPorCobrar.routes.js
const router = require('express').Router();
const { cuentasPorCobrar } = require('../controllers/cuentasPorCobrar.controller');

// GET /api/cuentas-por-cobrar
router.get('/', cuentasPorCobrar);

module.exports = router;
