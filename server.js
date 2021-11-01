const dev = process.env.NODE_ENV !== 'production';

const routes = require('./src/helpers/routes');
const app = require('express')();
const server = require('http').Server(app);
const next = require('next');

const nextApp = next({ dev });
const nextHandler = routes.getRequestHandler(nextApp);
const port = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
