const initialState = {};

function loading(state = initialState, action) {
  switch (action.type) {
    case '@loading/SET_LOADING':
      const { active } = action.payload;
      return { ...state, active };
    default:
      return state;
  }
}

export default loading;
