import io from 'socket.io-client';
import Api from 'services';

import { setUserMe } from 'store/modules/user/actions';

let socket = null;

function watch({ accessToken, userId, store }) {
  socket = io(`${process.env.config.siteUrl}`);

  async function handleNotifications(hasNotifications) {
    if(hasNotifications) {
      const data = { notificationsAvailable: 1 };

      await Api.MyAccount.putMe(accessToken, data);

      store.dispatch(setUserMe(data));
    }
  }

  socket.emit('notifications-init', userId);
  socket.on('notifications', handleNotifications);
}

function stop() {
  if(socket) {
    socket.close();
  }
}


export default {
  watch,
  stop
}