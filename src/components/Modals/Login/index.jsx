import React, { useCallback } from 'react';
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
import { LoginContainer, LoginRow, LoginForm } from './styles';

function LoginModal() {
  const dispatch = useDispatch();
  const { modalLogin } = useSelector(state => state.main);

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
      email: 'user@test.com',
      password: '123123'
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const resp = await Api.User.postLogin(values);
      setSubmitting(false);
      if (resp.access_token) {
        const favorites = await Api.MyAccount.getFavorites(resp.access_token);

        dispatch(
          setMain({
            modalLogin: false,
            modalLoginRegisterSuccess: true
          })
        );
        dispatch(
          setUser({
            logged: true,
            access_token: resp.access_token,
            favorites
          })
        );

        resetForm({});

        const buildingsSeen = JSON.parse(CookieBuildingSeen.getBuildingsSeen());
        buildingsSeen.map(b => Api.User.postBuildingSeen(resp.access_token, b));
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
            </LoginForm>
          </LoginRow>
          <LoginRow>
            <ColumnTitle>É sua primeira visita?</ColumnTitle>
            <Button href="/cadastrar" as="/cadastrar" fullWidth={true}>
              Cadastre
            </Button>
          </LoginRow>
        </LoginContainer>
      </Column>
    </Modal>
  );
}

export default LoginModal;
