import Cookies from 'js-cookie';

const cookieParams = {
  expires: 15
};

const user = store => next => action => {
  const userDataCookie = Cookies.get('userData');
  const userData = userDataCookie ? JSON.parse(userDataCookie) : {};

  if(action.type === '@user/SET_USER') {
    if(!action.payload || !action.payload.logged) {
      Cookies.remove('userData', cookieParams);
    } else if(action.payload && action.payload.logged) {
      Cookies.set('userData', JSON.stringify({
        ...userData,
        ...action.payload
      }), cookieParams);
    }
  } else if(action.type === '@user/SET_USER_BY_COOKIE') {
    if(userDataCookie) {
      store.dispatch({
        type: '@user/SET_USER',
        payload: userData
      });
    }
  } else if(action.type === '@user/UNSET_USER') {
    Cookies.remove('userData', cookieParams);
  }

  return next(action);
}

export default user;