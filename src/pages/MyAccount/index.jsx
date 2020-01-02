import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Api from 'services';

// actions
import { setMain } from 'store/modules/main/actions';
import { setUser } from 'store/modules/user/actions';

// styles
import { Container, Header, LinkLogOff, Nav, Li, Body } from './styles';

export default function MyAccount({ children, className }) {
  const router = useRouter();
  const page = router.pathname.replace('/minha-conta/', '');
  const dispatch = useDispatch();
  const access = useSelector(state => state.user);
  const [ userInfo, setuserInfo ] = useState({});

  const LogOFF = () => {
    dispatch(
      setUser({
        logged: false,
        access_token: '',
        favorites: []
      })
    );
  };

  useEffect(() => {
    async function loadUser() {
      if (access && access.logged) {
        const user = await Api.MyAccount.getMe(access.access_token);
        setuserInfo(user.data);
      } else {
        dispatch(
          setMain({
            modalLogin: true
          })
        );
      }
    }

    loadUser();
  }, [ access ]);

  return (
    <Container className={className}>
      <Header>
        <h1>
          Olá, <strong>{userInfo.name}</strong>
        </h1>
        <Link href="/" passHref>
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
