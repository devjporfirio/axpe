import React from 'react';

// components
import Headerbar from 'components/Headerbar';

// assets
import IClose from 'assets/icons/close-white';
import ICloseGreen from 'assets/icons/close-green';

// styles
import { Container, ButtonClose, Icon } from './styles';

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
        <Icon mq="mobile" src={ICloseGreen} alt="Fechar" />
        <Icon mq="dektop" src={IClose} alt="Fechar" />
      </ButtonClose>

      {children}
    </Container>
  );
}
