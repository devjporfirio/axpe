import React from 'react';

// styles
import { Container, Wrapper, ButtonClose } from './styles';

function Modal({ children, onClose }) {
  return (
    <Container onClick={onClose}>
      <Wrapper onClick={event => event.stopPropagation()}>
        <ButtonClose type="button" onClick={onClose}>Fechar</ButtonClose>
        {children}
      </Wrapper>
    </Container>
  )
}

export default Modal
