import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// helper
import User from 'helpers/user';

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
            <a href="/minha-conta">Visualizados recentemente</a>
          </Li>
          <Li active={page === 'perfil'}>
            <a href="/minha-conta/perfil">Editar Perfil</a>
          </Li>
          <Li active={page === 'alertas'}>
            <a href="/minha-conta/alertas">Meus aletas</a>
          </Li>
          <Li active={page === 'favoritos'}>
            <a href="/minha-conta/favoritos">Meus favoritos</a>
          </Li>
        </ul>
      </Nav>
      <Body>{children}</Body>
    </Container>
  );
}
