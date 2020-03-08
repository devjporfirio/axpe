import React, { useState, useCallback } from 'react';
import SVG from 'react-inlinesvg';

// assets
import ChatIconSVG from 'assets/icons/chat';

// styles
import {
  Container,
  Wrapper,
  ButtonFloat
} from './styles';

function ContactBar() {
  const [ show, setShow ] = useState(false);

  const toggleShow = useCallback(() => {
    setShow(!show);
  }, [ show ]);

  return (
    <>
      <ButtonFloat type="button" onClick={toggleShow}>
        Abrir contato
        <SVG src={ChatIconSVG} uniquifyIDs={true} />
      </ButtonFloat>
      {show && (
        <Container>
          <Wrapper></Wrapper>
        </Container>
      )}
    </>
  )
}

export default ContactBar
