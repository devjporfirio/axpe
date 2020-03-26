import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

  return modalLoginRegisterSuccess ? (
    <Modal active={modalLoginRegisterSuccess} onClose={closeModal} themeColor="green">
      <Success size="big">
        <SuccessColumn>
          <h2>Seu login <strong>já está criado.</strong></h2>
        </SuccessColumn>
        <SuccessColumn>
          <p>Agora é só criar sua lista de favoritos.</p>
          <Button href="/minha-conta" as="/minha-conta">Quero ver meu perfil</Button>
        </SuccessColumn>
      </Success>
    </Modal>
  ) : null;
}

export default LoginRegisterSuccessModal;
