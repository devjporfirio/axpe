import React from 'react';
import { Container, ButtonClose, Header, Icon } from './styles';

import IClose from 'assets/icons/close-white.svg';
import ICloseGreen from 'assets/icons/close-green.svg';

export default function Modal({
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
        <Icon mq="mobile" src={ICloseGreen} alt="Fechar" />
        <Icon mq="dektop" src={IClose} alt="Fechar" />
      </ButtonClose>

      {children}
    </Container>
  );
}
