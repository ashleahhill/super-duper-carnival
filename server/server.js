const express = require('express');
const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');
const https = require('https');
const path = require('path');

function server(config) {

  const app = express();
  const darkSky = config['dark-sky'];

  app.use(express.static(path.resolve(__dirname, '..', 'public')));

  app.use(proxy(
    '/api/weather',
    {
      target: `https://api.darksky.net`,
      logLevel: 'debug',
      agent: https.globalAgent,
      headers: {
        host: 'api.darksky.net'
      },
      pathRewrite: { '^/api/weather': `/forecast/${darkSky}` }
    }
  ));

  app.use(history());

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'public/index.html')); // load our public/index.html file
  });


  return app;
}

exports = module.exports = server;
