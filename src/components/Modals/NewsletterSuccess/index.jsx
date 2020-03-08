import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Modal from 'components/Modals';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import { Success, SuccessColumn } from 'components/Modals/styles';

function NewsletterSuccess() {
  const dispatch = useDispatch();
  const { modalNewsletterSuccess } = useSelector(state => state.main);

  const closeModal = useCallback(() => {
    dispatch(setMain({ modalNewsletterSuccess: false }))
  }, [ modalNewsletterSuccess ])

  return modalNewsletterSuccess ? (
    <Modal active={modalNewsletterSuccess} onClose={closeModal} themeColor="green">
      <Success>
        <SuccessColumn>
          <h2>Quase pronto!</h2>
        </SuccessColumn>
        <SuccessColumn>
          <p>Só mais um passo: precisamos apenas confirmar seu cadastro. Por favor, clique no link que acabamos de enviar para você por email.</p>
        </SuccessColumn>
      </Success>
    </Modal>
  ) : null;
}

export default NewsletterSuccess
