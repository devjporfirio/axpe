import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// components
import Modal from 'components/Modals';
import Button from 'components/Button';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import { SuccessColumn } from 'components/Modals/styles';
import { Success } from './styles';

function RegisterSuccess() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { modalRegisterSuccess } = useSelector(state => state.main);

  const closeModal = useCallback(() => {
    dispatch(setMain({ modalRegisterSuccess: false }));
    router.push(`/`);
  }, [ modalRegisterSuccess ]);

  return (
    <Modal
      active={modalRegisterSuccess}
      onClose={closeModal}
      themeColor="green"
    >
      <Success>
        <SuccessColumn>
          <h2>
            <span>O primeiro passo</span>
            <br /> foi dado!
          </h2>
        </SuccessColumn>
        <SuccessColumn>
          <p>Aguarde nosso contato para agendar uma visita ao seu imóvel.</p>
          <Button type="button" onClick={closeModal}>
            Cadastrar outro
          </Button>
        </SuccessColumn>
      </Success>
    </Modal>
  );
}

export default RegisterSuccess;
