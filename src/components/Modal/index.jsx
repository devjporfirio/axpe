import React from 'react';
import { Container, ButtonClose, Header } from './styles';

import IClose from 'assets/icons/close-white.svg';
import ICloseGreen from 'assets/icons/close-green.svg';

export default function Modal ({
  closeModal = () => {},
  children,
  className,
  category,
  local
}) {
  return (
    <Container className={className}>
      <Header category={category} local={local} />
      <ButtonClose
        onClick={closeModal}
      >
        <span>Fechar</span>
        <img mq="mobile" src={ICloseGreen} alt="Fechar" />
        <img mq="dektop" src={IClose} alt="Fechar" />
      </ButtonClose>

      {children}
    </Container>
  );
}
