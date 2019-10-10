import React from 'react';
import { Container, ButtonClose } from './styles';
import IClose from 'assets/icons/close.svg';

const customStyles = {
  overlay: {
    top: '67px',
    zIndex: 10
  }
};

export default function Modal({
  open = true,
  afterOpenModal = () => {},
  closeModal = () => {},
  label = 'Example Modal',
  children
}) {
  return (
    <Container
      isOpen={open}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel={label}
      style={customStyles}
    >
      <ButtonClose onClick={closeModal}>
        <img src={IClose} alt="Fechar" />
      </ButtonClose>
      {children}
    </Container>
  );
}
