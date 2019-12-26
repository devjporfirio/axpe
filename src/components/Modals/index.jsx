import React from 'react';

// styles
import { Container, Wrapper, ButtonClose } from './styles';

function Modal({
  active,
  children,
  onClose,
  themeColor = 'default',
  className
}) {
  return (
    <Container
      active={active}
      onClick={onClose}
      themeColor={themeColor}
      className={className}
    >
      <Wrapper
        onClick={event => event.stopPropagation()}
        themeColor={themeColor}
      >
        <ButtonClose type="button" onClick={onClose} themeColor={themeColor}>
          Fechar
        </ButtonClose>
        {children}
      </Wrapper>
    </Container>
  );
}

export default Modal;
