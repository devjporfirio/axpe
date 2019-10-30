const initialState = {
  loaded: false
};

function main(state = initialState, action) {
  switch (action.type) {
    case '@main/SET_MAIN':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default main;
