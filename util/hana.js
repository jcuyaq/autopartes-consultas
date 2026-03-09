// util/hana.js
const hana = require('@sap/hana-client');

const connParams = {
  serverNode: `${process.env.HANA_HOST}:${process.env.HANA_PORT}`,
  uid:        process.env.HANA_USER     || 'B1ADMIN',
  pwd:        process.env.HANA_PASSWORD || 'S0p0rt3*',
};

const conn = hana.createConnection();
let connectingPromise = null;

function isConnected() {
  try { return conn.isConnected && conn.isConnected(); }
  catch { return false; }
}

function ensureConnected() {
  if (isConnected()) {
    console.log('[HANA] Ya conectado');
    return Promise.resolve();
  }

  if (connectingPromise) {
    console.log('[HANA] Conexión en progreso, esperando...');
    return connectingPromise;
  }

  console.log('[HANA] Iniciando conexión a', connParams.serverNode);

  connectingPromise = new Promise((resolve, reject) => {
    conn.connect(connParams, (err) => {
      if (err && /already\s+connected/i.test(String(err.message))) {
        console.log('[HANA] Ya estaba conectado (already connected)');
        connectingPromise = null;
        return resolve();
      }
      if (err) {
        console.error('[HANA] Error al conectar:', err.message);
      } else {
        console.log('[HANA] Conexión exitosa a', connParams.serverNode);
      }
      const done = (e) => { connectingPromise = null; e ? reject(e) : resolve(); };
      return err ? done(err) : done();
    });
  });

  return connectingPromise;
}

async function execQuery(sql, params = []) {
  await ensureConnected();
  return new Promise((resolve, reject) => {
    conn.prepare(sql, (err, stmt) => {
      if (err) return reject(err);
      stmt.exec(params, (err2, rs) => {
        if (err2) {
          stmt.drop();
          if (/not\s+connected|invalid\s+connection/i.test(String(err2.message))) {
            connectingPromise = null;
            return ensureConnected()
              .then(() => execQuery(sql, params).then(resolve).catch(reject));
          }
          return reject(err2);
        }
        const rows = Array.isArray(rs) ? rs : (rs?.fetchAll?.() || []);
        stmt.drop();
        resolve(rows);
      });
    });
  });
}

module.exports = { execQuery, ensureConnected };
