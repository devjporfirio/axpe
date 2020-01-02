import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// helpers
import User from 'helpers/user';

// styles
import { Container, Header, LinkLogOff, Nav, Li, Body } from './styles';

export default function MyAccount({ children, className }) {
  const userInfos = User.getInfos();
  const router = useRouter();
  const page = router.pathname.replace('/minha-conta/', '');

  const LogOFF = () => {
    User.setInfos({});
  };

  return (
    <Container className={className}>
      <Header>
        <h1>
          Olá, <strong>{userInfos.name}</strong>
        </h1>
        <Link href="/">
          <LinkLogOff onClick={LogOFF}>Log off</LinkLogOff>
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
