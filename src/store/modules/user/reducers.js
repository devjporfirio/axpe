const initialState = {
  logged: false,
  access_token: '',
  favorites: [],
  me: {}
};

function user(state = initialState, action) {
  switch (action.type) {
    case '@user/SET_USER':
      return { ...state, ...action.payload };
    case '@user/UNSET_USER':
      return initialState;
    default:
      return state;
  }
}

export default user;
