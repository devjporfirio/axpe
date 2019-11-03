const initialState = { active: false };

function search(state = initialState, action) {
  switch (action.type) {
    case '@search/SET_SEARCH':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default search;
