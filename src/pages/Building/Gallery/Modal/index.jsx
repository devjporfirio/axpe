import React from 'react';

// styles
import { Container, ButtonClose, Header } from './styles';

export default function Modal({
  closeModal = () => {},
  children,
  className,
  category,
  local
}) {
  return (
    <Container className={className}>
      <Header type="modal" title={category} subtitle={local} />
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
