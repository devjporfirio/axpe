import React from 'react';
import { Container } from './styles';

export default function Modal({
  open = true,
  afterOpenModal = () => {},
  closeModal = () => {},
  label = 'Example Modal',
  children,
  stylesC = {},
  className
}) {
  const customStyles = {
    overlay: {
      top: '67px',
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
      {children}
    </Container>
  );
}
