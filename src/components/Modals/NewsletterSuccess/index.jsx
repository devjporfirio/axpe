import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Modal from 'components/Modals';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import { Success, SuccessColumn } from './styles';

function NewsletterModal() {
  const dispatch = useDispatch();
  const { modalNewsletterSuccess } = useSelector(state => state.main);

  const closeModal = useCallback(() => {
    dispatch(setMain({ modalNewsletterSuccess: false }))
  }, [ modalNewsletterSuccess ])

  return (
    <Modal active={modalNewsletterSuccess} onClose={closeModal} themeColor="green">
      <Success>
        <SuccessColumn>
          <h2>Pronto!</h2>
        </SuccessColumn>
        <SuccessColumn>
          <p>Sua mensagem foi enviada com sucesso. Responderemos rapidamente.</p>
        </SuccessColumn>
      </Success>
    </Modal>
  )
}

export default NewsletterModal
