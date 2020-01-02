const initialState = {
  logged: false,
  access_token: '',
  favorites: []
};

function user(state = initialState, action) {
  switch (action.type) {
    case '@user/SET_USER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default user;
