import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

// helpers
import { Link } from 'helpers/routes';

// styles
import {
  Container,
  Header,
  Wrapper,
  ButtonClose,
  ButtonCloseLink,
  Body,
  Text
} from './styles';

function LegalTextBox({ title, content, onDemand, active, onClose }) {
  const router = useRouter();
  const [ oldUrl, setOldUrl ] = useState(null);

  function handleClose() {
    if(typeof onClose === 'function') {
      onClose();
    }
  }

  useEffect(() => {
    if(active) {
      router.push(Router.pathname, '/politica-de-privacidade', {
        shallow: true
      });
      setOldUrl(Router.pathname);
    } else if(oldUrl) {
      router.push(oldUrl, oldUrl, {
        shallow: true
      });
    }
  }, [ active ]);

  return ((onDemand && active) || !onDemand) ? (
    <Container>
      <Wrapper>
        <Header>
          <h2>{ title }</h2>
          {onDemand ? (
            <ButtonClose type="button" onClick={handleClose}>
              Fechar
            </ButtonClose>
          ) : (
            <Link route="/" passHref>
              <ButtonCloseLink>Fechar</ButtonCloseLink>
            </Link>
          )}
        </Header>
        <Body>
          <Text>
            { content }
          </Text>
        </Body>
      </Wrapper>
    </Container>
  ) : null;
}

export default LegalTextBox;