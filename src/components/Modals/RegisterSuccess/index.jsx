import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// components
import Modal from 'components/Modals';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import { SuccessColumn } from 'components/Modals/styles';
import { Success } from './styles';

function RegisterSuccess() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { modalRegisterSuccess } = useSelector(state => state.main);

  const closeModal = useCallback((redirectUrl = '/') => {
    dispatch(setMain({ modalRegisterSuccess: false }));
    router.push(redirectUrl);
  }, [ modalRegisterSuccess ]);

  return modalRegisterSuccess ? (
    <Modal
      active={modalRegisterSuccess}
      onClose={() => closeModal()}
      themeColor="green"
    >
      <Success>
        <SuccessColumn>
          <h2>Recebemos&nbsp;o seu&nbsp;<span>cadastro</span></h2>
        </SuccessColumn>
        <SuccessColumn>
          <p>Aguarde nosso contato para agendarmos uma visita ao seu imóvel.</p>
        </SuccessColumn>
      </Success>
    </Modal>
  ) : null;
}

export default RegisterSuccess;
