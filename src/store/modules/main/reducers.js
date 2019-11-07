const initialState = {
  loaded: false,
  headerHiding: false,
  searchFormActive: false
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
