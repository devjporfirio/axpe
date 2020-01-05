import Cookies from 'js-cookie';

const cookieParams = {
  expires: 15
};

const login = store => next => action => {
  if(action.type === '@user/SET_USER') {
    if(!action.payload || !action.payload.logged) {
      Cookies.remove('userData', cookieParams);
    } else if(action.payload && action.payload.logged) {
      Cookies.set('userData', JSON.stringify(action.payload), cookieParams);
    }
  } else if(action.type === '@user/SET_USER_BY_COOKIE') {
    const userData = Cookies.get('userData');
    if(userData) {
      store.dispatch({
        type: '@user/SET_USER',
        payload: JSON.parse(userData)
      });
    }
  }

  return next(action);
}

export default login;