const initialState = {
  loaded: false,
  currentBuilding: null,
  headerHiding: false,
  searchFormActive: false,
  searchFunnel: null,
  modalNewsletter: false,
  modalNewsletterSuccess: false,
  modalLogin: false,
  modalLoginRegisterSuccess: false,
  modalRegisterSuccess: false,
  modalForgotPasswordSuccess: false,
  modalContact: false,
  modalContactSuccess: false,
  modalContactMessage: '',
  modalPasswordNew: false
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
