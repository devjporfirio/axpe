import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import { Container, Header, LinkLogOff, Nav, Li, Body } from './styles';

export default function MyAccount({ children, className }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const router = useRouter();
  const page = router.pathname.replace('/minha-conta/', '');

  useEffect(() => {
    function loadUser() {
      if (user && user.logged) {
        dispatch(setMain({ modalLogin: false }));
      } else {
        dispatch(setMain({ modalLogin: router.pathname }));
      }
    }

    loadUser();
  }, [ user ]);

  if(!user.logged) return null;

  return (
    <Container className={className}>
      <Header>
        <h1>
          Olá, <strong>{user.me.name}</strong>
        </h1>
        <Link href="/logout" passHref>
          <LinkLogOff>Log off</LinkLogOff>
        </Link>
      </Header>

      <Nav>
        <ul>
          <Li active={page === '/minha-conta'}>
            <Link href="/minha-conta" passHref>
              Visualizados recentemente
            </Link>
          </Li>
          <Li active={page === 'perfil'}>
            <Link href="/minha-conta/perfil" passHref>
              Editar Perfil
            </Link>
          </Li>
          <Li active={page === 'alertas'}>
            <Link href="/minha-conta/alertas" passHref>
              Meus aletas
            </Link>
          </Li>
          <Li active={page === 'favoritos'}>
            <Link href="/minha-conta/favoritos" passHref>
              Meus favoritos
            </Link>
          </Li>
        </ul>
      </Nav>
      <Body>{children}</Body>
    </Container>
  );
}
