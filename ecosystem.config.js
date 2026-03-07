module.exports = {
  apps: [
    {
      name: 'autopartes-reportes',
      script: 'app.js',
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
