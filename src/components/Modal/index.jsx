import React from 'react';
import { Container, ButtonClose, Header } from './styles';

import IClose from 'assets/icons/close-white.svg';
import ICloseGreen from 'assets/icons/close-green.svg';

export default function Modal({
  open = true,
  afterOpenModal = () => {},
  closeModal = () => {},
  label = 'Example Modal',
  children,
  stylesC = {},
  className,
  styleCButtonClose = {},
  iconButtonWhite = true,
  header = ''
}) {
  const customStyles = {
    overlay: {
      top: window.innerWidth > 768 ? 0 : '67px',
      zIndex: 10,
      ...stylesC.overlay
    },
    container: {
      ...stylesC.container
    }
  };

  return (
    <Container
      className={className}
      isOpen={open}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel={label}
      style={customStyles}
    >
      {header && <Header category={header} />}
      <ButtonClose
        iconButtonWhite={iconButtonWhite}
        style={styleCButtonClose}
        onClick={closeModal}
      >
        <span>Fechar</span>
        <img
          src={
            window.innerWidth > 768 && iconButtonWhite ? IClose : ICloseGreen
          }
          alt="Fechar"
        />
      </ButtonClose>

      {children}
    </Container>
  );
}
