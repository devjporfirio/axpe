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
    OneSignal.getUserId(userId => {
      const user = store.getState().user;
      Api.MyAccount.updateIdOneSignal(user.access_token, userId);
    });

    // OneSignal.on('subscriptionChange', function(isSubscribed) {
    //   console.log('The user subscription state is now: ', isSubscribed);
    //   console.log('STORE:', store.getState());
    // });
  });

  // OneSignal.on('subscriptionChange', function(isSubscribed) {
  //   console.log('The user subscription state is now: ', isSubscribed);
  //   console.log('STORE:', store.getState());
  // });
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

async function handleSubscription({ action }) {
  const subscriptionState = await getSubscriptionState();

  if ((subscriptionState.isPushEnabled || subscriptionState.isPushSupported) && !action) {
    OneSignal.setSubscription(false);
  } else if (subscriptionState.isOptedOut && action) {
    OneSignal.setSubscription(true);
  } else if(!subscriptionState.isPushEnabled && action) {
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