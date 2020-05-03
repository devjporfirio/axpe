import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GTM from 'helpers/gtm';

// components
import Modal from 'components/Modals';
import Button from 'components/Button';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import { Success, SuccessColumn } from 'components/Modals/styles';

function LoginRegisterSuccessModal() {
  const dispatch = useDispatch();
  const { modalLoginRegisterSuccess } = useSelector(state => state.main);

  const closeModal = useCallback(() => {
    dispatch(setMain({ modalLoginRegisterSuccess: false }))
  }, [ modalLoginRegisterSuccess ]);

  useEffect(() => {
    if(modalLoginRegisterSuccess) {
      GTM.dataLayerPush({
        event: 'Form Response',
        formType: 'Cadastro',
        formResult: 'Sucesso',
        formMessage: ''
      });
    }
  }, [ modalLoginRegisterSuccess ]);

  return modalLoginRegisterSuccess ? (
    <Modal active={modalLoginRegisterSuccess} onClose={closeModal} themeColor="green">
      <Success size="big">
        <SuccessColumn>
          <h2>Seu login <strong>já está criado.</strong></h2>
        </SuccessColumn>
        <SuccessColumn>
          <p>Agora é só criar sua lista de favoritos.</p>
          <Button route="/minha-conta" className="holos-cta-profile">Quero ver meu perfil</Button>
        </SuccessColumn>
      </Success>
    </Modal>
  ) : null;
}

export default LoginRegisterSuccessModal;
