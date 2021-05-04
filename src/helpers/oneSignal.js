import Api from 'services';

function start() {
  OneSignal.push(function() {
    OneSignal.init({
      appId: '6ff2f5ea-038d-4544-b645-b80ca1bcf08b',
      // subdomainName: 'homolog-axpe.os.tc',
      // notifyButton: {
      //   enable: false
      // }
    })
  });
}

function watch(store) {
  OneSignal.push(function() {
    OneSignal.getUserId(id => {
      // console.log('OneSignal getUserId', id)
      const user = store.getState().user;
      Api.User.updateIdOneSignal(user.access_token, {
        one_signal_id: id
      });
    });

    // OneSignal.on('subscriptionChange', function(isSubscribed) {
    //   console.log('The user subscription state is now1: ', isSubscribed);
    //   console.log('STORE:', store.getState());
    // });
  });

  OneSignal.push(function() {
    OneSignal.getTags(function(tags) {
      // console.log('OneSignal tags', tags);
    });
  });

  // OneSignal.on('subscriptionChange', function(isSubscribed) {
  //   console.log('The user subscription state is now2: ', isSubscribed);
  //   console.log('STORE:', store.getState());
  // });
}

function setTags(configs) {
  function setTag(name, value) {
    OneSignal.push([ 'sendTag', name, value ]);
  }

  setTag('notificationAlert', configs.notificationAlert ? 1 : 0);
  setTag('notificationFavorite', configs.notificationFavorite ? 1 : 0);
}

async function getSubscriptionState() {
  const isPushEnabledPromise = OneSignal.isPushNotificationsEnabled()
  const isOptedOutPromise = OneSignal.isOptedOut()

  const isPushSupported = OneSignal.isPushNotificationsSupported();
  const isPushEnabled = await isPushEnabledPromise;
  const isOptedOut = await isOptedOutPromise;

  return {
    isPushSupported,
    isPushEnabled,
    isOptedOut,
  }
}

async function handleSubscription(configs) {
  const subscriptionState = await getSubscriptionState();

  // console.log('OneSignal handleSubscription 1', configs);

  if ((subscriptionState.isPushEnabled || subscriptionState.isPushSupported) && !configs.active) {
    // console.log('OneSignal handleSubscription 2');
    OneSignal.setSubscription(false);
  } else if (subscriptionState.isOptedOut && configs.active) {
    // console.log('OneSignal handleSubscription 3');
    OneSignal.setSubscription(true);
    setTags(configs);
  } else if(!subscriptionState.isPushEnabled && configs.active) {
    // console.log('OneSignal handleSubscription 4');
    OneSignal.registerForPushNotifications();
  } else {
    // console.log('handleSubscription 4');
  }
}

export default {
  watch,
  handleSubscription,
  start
}