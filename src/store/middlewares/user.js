import Cookies from 'js-cookie';

const cookieParams = {
  expires: 15
};

const user = store => next => action => {
  const userDataCookie = Cookies.get('userData');
  const userData = userDataCookie ? JSON.parse(userDataCookie) : {};

  const removeCookie = () => {
    Cookies.remove('userData', cookieParams);
  }

  if(action.type === '@user/SET_USER') {
    if(!action.payload || !action.payload.logged) {
      removeCookie();
    } else if(action.payload && action.payload.logged) {
      Cookies.set('userData', JSON.stringify({
        ...userData,
        ...action.payload
      }), cookieParams);
    }
  } else if(action.type === '@user/SET_USER_BY_COOKIE' && userDataCookie) {
    const currentTime = new Date().getTime();
    if(currentTime < userData.tokenMaxTime) {
      store.dispatch({
        type: '@user/SET_USER',
        payload: userData
      });
    } else {
      removeCookie();
    }
  } else if(action.type === '@user/UNSET_USER') {
    removeCookie();
  }

  return next(action);
}

export default user;