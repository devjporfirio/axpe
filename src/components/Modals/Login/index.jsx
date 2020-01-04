import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Api from 'services';

// components
import Modal from 'components/Modals';
import Slider from 'components/Slider';
import Button from 'components/Button';
import FormElements from 'components/FormElements';

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
  LoginForm,
  LoginFeedback,
  RegisterContainer
} from './styles';

function LoginModal() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { modalLogin } = useSelector(state => state.main);
  const [ showRegister, setShowRegister ] = useState(true);
  const [ loginError, setLoginError ] = useState(null);

  const closeModal = useCallback(() => {
    dispatch(setMain({ modalLogin: false }));
  }, [ modalLogin ]);

  const loginSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required()
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    touched,
    errors
  } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const response = await Api.User.postLogin(values);

      setSubmitting(false);

      if (response.access_token) {
        const favorites = await Api.MyAccount.getFavorites(response.access_token);

        dispatch(
          setMain({
            modalLogin: false,
            modalLoginRegisterSuccess: true
          })
        );

        dispatch(
          setUser({
            logged: true,
            access_token: response.access_token,
            favorites
          })
        );

        resetForm({});

        CookieBuildingSeen.saveAll(user);

      } else if(response.error) {
        let errorMessage = null;
        switch(response.error) {
          case 'user.not.found':
            errorMessage = 'Usuário não encontrado.';
            break;
          default:
            errorMessage = response.error;
            break;
        }
        setLoginError(errorMessage);
        setTimeout(() => {
          setLoginError(null);
        }, 3000);
      }
    }
  });

  return (
    <Modal active={modalLogin} onClose={closeModal}>
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
              <LoginForm onSubmit={handleSubmit}>
                <FormElements
                  type="emailmask"
                  name="email"
                  label="E-mail:"
                  placeholder="E-mail"
                  onChange={handleChange}
                  error={touched.email && errors.email}
                  value={values.email}
                  onBlur={handleBlur}
                />
                <FormElements
                  type="password"
                  name="password"
                  label="Senha:"
                  placeholder="Senha:"
                  onChange={handleChange}
                  error={touched.password && errors.password}
                  value={values.password}
                  onBlur={handleBlur}
                  useEye
                />
                <Button disabled={isSubmitting} type="submit" fullWidth>
                  Entrar
                </Button>
                {loginError && <LoginFeedback>{loginError}</LoginFeedback>}
              </LoginForm>
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
          <RegisterContainer>
            <ColumnTitle>
              Crie sua conta
            </ColumnTitle>
          </RegisterContainer>
        )}
      </Column>
    </Modal>
  );
}

export default LoginModal;
