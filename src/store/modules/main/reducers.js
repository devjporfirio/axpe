const initialState = {
  loaded: false,
  headerHiding: false,
  searchFormActive: false,
  modalNewsletter: false,
  modalNewsletterSuccess: false,
  modalLogin: false,
  modalLoginRegisterSuccess: false,
  modalRegisterSuccess: false,
  modalContact: false,
  modalContactMessage: ''
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
