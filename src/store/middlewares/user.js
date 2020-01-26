import Cookies from 'js-cookie';
import Api from 'services';

const cookieParams = {
  expires: 15
};

const user = store => next => async action => {
  const userDataCookie = Cookies.get('userData');
  const userData = userDataCookie ? JSON.parse(userDataCookie) : {};

  const removeCookie = () => {
    Cookies.remove('userData', cookieParams);
  }

  const checkFavorite = (reference) => {
    const building = store.getState().user.favorites.find(x => x === reference);
    return !!building;
  }

  const sendBuildingsToLike = async (accessToken, buildings) => {
    await Promise.all(
      buildings.map(async building => {
        const isFavoriteBuilding = checkFavorite(building);
        const response = await Api.MyAccount.postFavorite(
          accessToken,
          building,
          !isFavoriteBuilding
        );
        return response;
      })
    );
    await updateFavorites(accessToken);
  }

  const updateFavorites = async (accessToken) => {
    const favorites = await Api.MyAccount.getFavorites(accessToken);
    store.dispatch({
      type: '@user/SET_FAVORITES',
      payload: favorites
    })
  }

  if(action.type === '@user/SET_USER') {
    if(!action.payload || !action.payload.logged) {
      removeCookie();
    } else if(action.payload && action.payload.logged) {
      Cookies.set('userData', JSON.stringify({
        ...userData,
        ...action.payload
      }), cookieParams);
      updateFavorites(userData.access_token);
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
  } else if(action.type === '@user/SET_BUILDING_TO_LIKE') {
    const { buildingsToLike, access_token } = store.getState().user;
    const listBuildingsToLike = buildingsToLike;

    if(action.payload && listBuildingsToLike.indexOf(action.payload) < 0) {
      listBuildingsToLike.push(action.payload)
    }

    if(access_token && action.payload) {
      action.payload = null;
      await sendBuildingsToLike(access_token, listBuildingsToLike);
    }

  } else if(action.type === '@user/UNSET_USER') {
    removeCookie();
  }

  return next(action);
}

export default user;