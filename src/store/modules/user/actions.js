export function setUser(data) {
  return { type: '@user/SET_USER', payload: data };
}

export function setUserByCookie() {
  return { type: '@user/SET_USER_BY_COOKIE' };
}
