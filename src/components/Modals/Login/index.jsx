import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Api from 'services';

// components
import Modal from 'components/Modals';
import Slider from 'components/Slider';
import Button from 'components/Button';
import LoginForm from 'components/Modals/Login/LoginForm';
import RegisterForm from 'components/Modals/Login/RegisterForm';

// actions
import { setMain } from 'store/modules/main/actions';
import { setUser } from 'store/modules/user/actions';

// helpers
import CookieBuildingSeen from 'helpers/cookieBuildingSeen';

// styles
import {
  Texts,
  Text,
  TextWrapper,
  Column,
  ColumnTitle
} from 'components/Modals/styles';

import {
  LoginContainer,
  LoginRow
} from './styles';

function LoginModal() {
  const dispatch = useDispatch();
  const { modalLogin } = useSelector(state => state.main);
  const [ showRegister, setShowRegister ] = useState(false);

  const closeModal = useCallback(() => {
    dispatch(setMain({ modalLogin: false }));
  }, [ modalLogin ]);

  const onClickButtonBack = useCallback(() => {
    setShowRegister(false);
  }, []);

  const doAfterLogin = useCallback(async response => {
    const favorites = await Api.MyAccount.getFavorites(response.access_token);
    const me = await Api.MyAccount.getMe(response.access_token);
    const tokenTime = new Date().getTime();
    const tokenMaxTime = tokenTime + (3600 * 1000);

    dispatch(
      setUser({
        logged: true,
        access_token: response.access_token,
        tokenTime,
        tokenMaxTime,
        favorites,
        me: { ...me.data }
      })
    );

    CookieBuildingSeen.saveAll(response);
  }, []);

  return (
    <Modal
      active={modalLogin}
      onClose={closeModal}
      showButtonBack={showRegister}
      onClickButtonBack={onClickButtonBack}
    >
      <Texts>
        <Slider propsArrow={{ color: 'white' }}>
          <Text>
            <TextWrapper>
              <h2 className="big">
                Uma <strong>Axpe</strong> <span>só sua</span>
              </h2>
              <p>
                Leva só 10 segundos: personalize sua navegação salvando seus
                imóveis favoritos, criando alertas e recebendo notícias de
                móveis com seu perfil.
                <br /> É só fazer seu login.
              </p>
            </TextWrapper>
          </Text>
          <Text>
            <TextWrapper>
              <h2>
                Todos os dias chegam <strong>novos imóveis</strong>. Seja o
                primeiro a saber.
              </h2>
              <p>
                Faça seu login e receba um alerta sempre que chegar um imóvel
                com seu perfil
              </p>
            </TextWrapper>
          </Text>
        </Slider>
      </Texts>
      <Column>
        {!showRegister && (
          <LoginContainer>
            <LoginRow>
              <ColumnTitle>
                Já tem um cadastro? <span>Faça seu login.</span>
              </ColumnTitle>
              <LoginForm doAfterLogin={doAfterLogin} />
            </LoginRow>
            <LoginRow>
              <ColumnTitle>É sua primeira visita?</ColumnTitle>
              <Button type="button" fullWidth={true} onClick={() => setShowRegister(true)}>
                Cadastre
              </Button>
            </LoginRow>
          </LoginContainer>
        )}
        {showRegister && (
          <LoginContainer type="register">
            <ColumnTitle>
              Crie sua conta
            </ColumnTitle>
            <RegisterForm doAfterLogin={doAfterLogin} />
          </LoginContainer>
        )}
      </Column>
    </Modal>
  );
}

export default LoginModal;
