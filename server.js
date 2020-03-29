const dev = process.env.NODE_ENV !== 'production';

const routes = require('./src/helpers/routes');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const axios = require('axios');
const config = require(`./config/${process.env.NODE_ENV}.json`);

const nextApp = next({ dev });
const nextHandler = routes.getRequestHandler(nextApp);
// const nextHandler = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

const getNotifications = async userId => {
  let hasNotifications = false;

  try {
    const items = await axios.get(`${config.apiUrl}/notifications/users`);
    const results = items.data.filter(item => item.id === userId);

    if (results && results.length) {
      hasNotifications = true;

      // TODO: Send push notifications by OneSignal
      // items.forEach(item => {
      //   console.log(item.idOneSignal)
      // });
    }

    return hasNotifications;
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

io.on('connection', socket => {
  let timer;
  // const timing = 5000;
  const timing = 30000;

  socket.on('notifications-init', userId => {
    if (timer) {
      clearTimeout(timer);
    }

    const reqGetNotifications = async () => {
      const response = await getNotifications(userId);

      socket.emit('notifications', response);

      timer = setTimeout(() => reqGetNotifications(), timing);
    };

    reqGetNotifications();
  });

  socket.on('disconnect', () => {
    clearTimeout(timer);
  });
});

nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
