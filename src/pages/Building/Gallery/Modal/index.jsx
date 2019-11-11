import React from 'react';

// components
import Headerbar from 'components/Headerbar';

// styles
import { Container, ButtonClose } from './styles';

export default function Modal({
  closeModal = () => {},
  children,
  className,
  category,
  local
}) {
  return (
    <Container className={className}>
      <Headerbar type="modal" title={category} subtitle={local} />
      <ButtonClose
        onClick={closeModal}
      >
        <span>Fechar</span>
        <i></i>
      </ButtonClose>

      {children}
    </Container>
  );
}
