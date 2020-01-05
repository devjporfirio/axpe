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

  return (
    <Modal active={modalLoginRegisterSuccess} onClose={closeModal} themeColor="green">
      <Success size="big">
        <SuccessColumn>
          <h2><strong>Tudo pronto!</strong><br/> Nunca mais você precisará preencher esses campos</h2>
        </SuccessColumn>
        <SuccessColumn>
          <p>Agora você pode salvar seus favoritos, criar alertas e falar com a gente sempre que quiser.</p>
          <Button href="/minha-conta" as="/minha-conta">Ver perfil</Button>
        </SuccessColumn>
      </Success>
    </Modal>
  )
}

export default LoginRegisterSuccessModal;
