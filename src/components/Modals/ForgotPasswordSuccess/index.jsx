import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GTM from 'helpers/gtm';

// components
import Modal from 'components/Modals';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import { Success, SuccessColumn } from 'components/Modals/styles';

function ForgotPasswordSuccess() {
  const dispatch = useDispatch();
  const { modalForgotPasswordSuccess } = useSelector(state => state.main);

  const closeModal = useCallback(() => {
    dispatch(setMain({ modalForgotPasswordSuccess: false }))
  }, [ modalForgotPasswordSuccess ]);

  useEffect(() => {
    if(modalForgotPasswordSuccess) {
      GTM.dataLayerPush({
        event: 'Form Response',
        formType: 'Recuperar Senha',
        formResult: 'Sucesso',
        formMessage: ''
      });
    }
  }, [ modalForgotPasswordSuccess ]);

  return modalForgotPasswordSuccess ? (
    <Modal active={modalForgotPasswordSuccess} onClose={closeModal} themeColor="green">
      <Success>
        <SuccessColumn>
          <h2>Quase lá!</h2>
        </SuccessColumn>
        <SuccessColumn>
          <p>Só mais um passo. Por favor, clique no link que acabamos de enviar para você por email.</p>
        </SuccessColumn>
      </Success>
    </Modal>
  ) : null;
}

export default ForgotPasswordSuccess
