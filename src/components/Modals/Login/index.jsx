import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Modal from 'components/Modals';
import Slider from 'components/Slider';
import Button from 'components/Button';
import ForgotPasswordForm from 'components/Modals/Login/ForgotPasswordForm';
import LoginForm from 'components/Modals/Login/LoginForm';
import RegisterForm from 'components/Modals/Login/RegisterForm';
import LoginSocials from 'components/Modals/Login/LoginSocials';

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
  LoginRow,
  ForgotPassButton
} from './styles';

function LoginModal() {
  const dispatch = useDispatch();
  const { modalLogin } = useSelector(state => state.main);
  const [ loginType, setLoginType ] = useState(null);
  const [ showRegister, setShowRegister ] = useState(false);
  const [ showForgotPasswordForm, setShowForgotPasswordForm ] = useState(false);

  const closeModal = useCallback(() => {
    dispatch(setMain({ modalLogin: false }));
  }, [ modalLogin ]);

  const onClickButtonBack = useCallback(() => {
    setShowRegister(false);
  }, []);

  const doAfterLogin = useCallback(async response => {
    const tokenTime = new Date().getTime();
    const tokenMaxTime = tokenTime + (3600 * 1000);

    dispatch(
      setUser({
        logged: true,
        access_token: response.access_token,
        id: response.id,
        tokenTime,
        tokenMaxTime
      })
    );

    CookieBuildingSeen.saveAll(response);
  }, []);

  const toggleForgotPassordForm = useCallback(() => {
    setShowForgotPasswordForm(!showForgotPasswordForm);
  }, [ showForgotPasswordForm ]);

  useEffect(() => {
    if(modalLogin && typeof modalLogin === 'string' && modalLogin.search('favorite=true') >= 0) {
      setLoginType('favorite');
    } else {
      setLoginType(null);
    }
  }, [ modalLogin ]);

  return modalLogin ? (
    <Modal
      active={modalLogin}
      onClose={closeModal}
      showButtonBack={showRegister}
      onClickButtonBack={onClickButtonBack}
      dataType={showForgotPasswordForm ? 'Recuperar Senha' : 'Login'}
    >
      <Texts>
        {!loginType && (
          <Slider propsArrow={{ color: 'white' }}>
            <Text>
              <TextWrapper>
                <h2>
                  Imóveis bacanas atraem <strong>clientes bacanas.</strong> <span>E vice-versa.</span>
                </h2>
                <p>
                  Crie o seu login. É rapidinho, leva menos de 10 segundos, e você nunca mais terá que fazer isso.<br/>
                  Vamos começar?
                </p>
              </TextWrapper>
            </Text>
            {/* <Text>
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
            </Text> */}
          </Slider>
        )}

        {loginType && loginType === 'favorite' && (
          <Slider propsArrow={{ color: 'white' }}>
            <Text>
              <TextWrapper>
                <h2>
                  <strong>Namore</strong> seus favoritos quando quiser
                </h2>
                <p>
                  Crie o seu login. É rapidinho, leva menos de 10 segundos, e você nunca mais terá que fazer isso. Vamos começar?
                </p>
              </TextWrapper>
            </Text>
          </Slider>
        )}
      </Texts>
      <Column>
        {!showRegister && (
          <LoginContainer>
            <LoginRow>
              {!showForgotPasswordForm ? (
                <>
                  <ColumnTitle>
                    Já tem um cadastro? <span>Faça seu login.</span>
                  </ColumnTitle>
                  <LoginForm doAfterLogin={doAfterLogin} />
                </>
              ) : (
                <>
                  <ColumnTitle>
                    Preencha seu e-mail, <span>vamos te ajudar.</span>
                  </ColumnTitle>
                  <ForgotPasswordForm />
                </>
              )}
              <ForgotPassButton
                type="button"
                onClick={toggleForgotPassordForm}
                className="holos-form-link"
                data-type={showForgotPasswordForm ? 'Recuperar Senha' : 'Login'}
              >
                {!showForgotPasswordForm ? 'Esqueceu sua senha?' : 'voltar para login'}
              </ForgotPassButton>
              <LoginSocials doAfterLogin={doAfterLogin} />
            </LoginRow>
            <LoginRow>
              <ColumnTitle>É sua primeira visita?</ColumnTitle>
              <Button
                type="button"
                className="holos-cta-register"
                fullWidth={true}
                onClick={() => setShowRegister(true)}
              >
                Quero me cadastrar
              </Button>
            </LoginRow>
          </LoginContainer>
        )}
        {showRegister && (
          <LoginContainer type="register">
            <ColumnTitle>
              {loginType && loginType === 'favorite' ? 'Crie seu login e comece a favoritar.' : 'Crie sua conta'}
            </ColumnTitle>
            <RegisterForm doAfterLogin={doAfterLogin} />
          </LoginContainer>
        )}
      </Column>
    </Modal>
  ) : null;
}

export default LoginModal;
