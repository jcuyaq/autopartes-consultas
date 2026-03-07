const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

// Cargar variables de entorno según NODE_ENV
const env     = process.env.NODE_ENV || 'development';
const envFile = path.resolve(process.cwd(), `.env.${env}`);
const defEnv  = path.resolve(process.cwd(), '.env');
const envPath = fs.existsSync(envFile) ? envFile : defEnv;
require('dotenv').config({ path: envPath });

console.log(`\n Entorno : ${env.toUpperCase()}`);
console.log(` Archivo : ${path.basename(envPath)}`);
console.log(` HANA DB : ${process.env.HANA_DB}`);
console.log(` Puerto  : ${process.env.PORT}\n`);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const cuentasPorCobrarRoutes = require('./routes/cuentasPorCobrar.routes');
app.use('/api/cuentas-por-cobrar', cuentasPorCobrarRoutes);

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true, env }));

process.on('uncaughtException',    (err)          => console.error('Error no capturado:', err));
process.on('unhandledRejection',   (reason)       => console.error('Promesa rechazada:', reason));

const PORT = process.env.PORT || 8010;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(` Servidor corriendo en http://0.0.0.0:${PORT}`);
});

server.on('error', (err) => console.error('Error del servidor:', err));
