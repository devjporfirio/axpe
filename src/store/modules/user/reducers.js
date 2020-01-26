const initialState = {
  logged: false,
  access_token: '',
  favorites: [],
  me: {},
  buildingsToLike: []
};

function user(state = initialState, action) {
  switch (action.type) {
    case '@user/SET_USER':
      return { ...state, ...action.payload };

    case '@user/UNSET_USER':
      return initialState;

    case '@user/SET_BUILDING_TO_LIKE':
      let newBuildingsToLike = state.buildingsToLike;

      if(action.payload) {
        if(newBuildingsToLike.indexOf(action.payload) < 0) {
          newBuildingsToLike.push(action.payload);
        }
      } else {
        newBuildingsToLike = [];
      }

      return {
        ...state,
        buildingsToLike: newBuildingsToLike
      };

    case '@user/SET_FAVORITES':
      return { ...state, favorites: action.payload };

    case '@user/SET_ME':
      return {
        ...state,
        me: {
          ...state.me,
          ...action.payload
        }
      };

    default:
      return state;
  }
}

export default user;
