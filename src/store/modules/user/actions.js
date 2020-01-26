export function setUser(data) {
  return { type: '@user/SET_USER', payload: data };
}

export function unsetUser() {
  return { type: '@user/UNSET_USER' };
}

export function setUserByCookie() {
  return { type: '@user/SET_USER_BY_COOKIE' };
}

export function setUserBuildingToLike(data) {
  return { type: '@user/SET_BUILDING_TO_LIKE', payload: data };
}

export function setUserFavorites(data) {
  return { type: '@user/SET_FAVORITES', payload: data };
}
