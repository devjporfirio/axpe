import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Head from 'next/head';
// import SVG from 'react-inlinesvg';
// import OneSignalHelper from 'helpers/oneSignal';
import Api from 'services';
import * as Yup from 'yup';

// helpers
import SeoData from 'helpers/seo';

// actions
import { setUserMe } from 'store/modules/user/actions';

// components
import FormElements from 'components/FormElements';
import UpdatePassModal from 'components/Modals/UpdatePass';

// icons
// import Facebook from 'assets/icons/facebook-rounded';
// import Google from 'assets/icons/google-rounded';

// styles
import { LoginFeedback } from 'components/Modals/Login/styles';
import { FormGroup } from 'components/FormElements/styles';
import {
  Container,
  Body,
  Form,
  ButtonPass,
  ButtonSave,
  FormElementsCheck,
  // FormSocial,
  FormGroupElements,
  FormGroupAlerts
} from 'pages/MyAccount/Profile/styles';

const profileSchema = Yup.object().shape({
  name: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().required(),
  phone: Yup.string().required(),
  notificationAlert: Yup.bool().required(),
  notificationFavorite: Yup.bool().required()
});

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [ changePass, setChangePass ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    initialValues: {
      name: user.me.name,
      lastName: user.me.lastName,
      email: user.me.email,
      phone: user.me.phone,
      notificationAlert: user.me.notificationAlert,
      notificationFavorite: user.me.notificationFavorite
    },
    validationSchema: profileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const response = await Api.MyAccount.putMe(user.access_token, values);

      setSubmitting(false);

      if (response.status) {
        dispatch(setUserMe(values));
        setErrorMessage('Alteração realizada com sucesso.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else {
        setErrorMessage(response.msg);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    }
  });

  const submitField = async ({ name, value }) => {
    const data = {
      [name]: value
    };

    await Api.MyAccount.putMe(user.access_token, data);

    dispatch(setUserMe(data));
  }

  const handleNotificationAlert = useCallback(() => {
    const value = values.notificationAlert === 1 ? 0 : 1;

    setFieldValue('notificationAlert', value);

    // OneSignalHelper.handleSubscription({
    //   action: !!value,
    //   user
    // });

    submitField({ name: 'notificationAlert', value });
  }, [ user.logged, values.notificationAlert ])

  useEffect(() => {
    if (user.logged && user.me && user.me.name) {
      setFieldValue('name', user.me.name);
      setFieldValue('lastName', user.me.lastName);
      setFieldValue('email', user.me.email);
      setFieldValue('phone', user.me.phone);
      setFieldValue('notificationAlert', user.me.notificationAlert);
      setFieldValue('notificationFavorite', user.me.notificationFavorite);
    }
  }, [ user.logged, user.me ]);

  if (!user.logged || !user.me || !user.me.name) return <Container />;

  return (
    <>
      <Head>
        <title>{`Perfil | Minha Conta - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        <Body>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <h2>Atualizar perfil</h2>
              <FormGroupElements>
                <FormElements
                  name="name"
                  label="Nome"
                  placeholder="Nome"
                  onChange={handleChange}
                  error={touched.name && errors.name}
                  value={values.name}
                  onBlur={handleBlur}
                />
                <FormElements
                  name="lastName"
                  label="Sobrenome"
                  placeholder="Sobrenome"
                  onChange={handleChange}
                  error={touched.lastName && errors.lastName}
                  value={values.lastName}
                  onBlur={handleBlur}
                />
              </FormGroupElements>
              <FormGroupElements>
                <FormElements
                  type="emailmask"
                  name="email"
                  label="E-mail"
                  placeholder="E-mail"
                  onChange={handleChange}
                  error={touched.email && errors.email}
                  value={values.email}
                  onBlur={handleBlur}
                />
                <FormElements
                  type="phone"
                  name="phone"
                  label="Telefone"
                  placeholder="Telefone"
                  onChange={handleChange}
                  error={touched.phone && errors.phone}
                  value={values.phone}
                  onBlur={handleBlur}
                />
              </FormGroupElements>
            </FormGroup>

            <ButtonPass type="button" onClick={() => setChangePass(true)}>
              Alterar Senha
            </ButtonPass>

            <FormGroup>
              <h2>Notificações</h2>
              <FormGroupAlerts>
                <FormElementsCheck
                  type="checkbox"
                  name="notificationAlert"
                  label={
                    <>
                      <strong>Meus Alertas</strong> <br />
                      Novos imóveis adicionados
                    </>
                  }
                  checked={values.notificationAlert === 1}
                  onChange={handleNotificationAlert}
                  error={touched.notificationAlert && errors.notificationAlert}
                  value={values.notificationAlert}
                  onBlur={handleBlur}
                />
                <FormElementsCheck
                  type="checkbox"
                  name="notificationFavorite"
                  label={
                    <>
                      <strong>Favoritos</strong> <br />
                      Informações atualizadas
                    </>
                  }
                  checked={values.notificationFavorite === 1}
                  onChange={() =>
                    setFieldValue(
                      'notificationFavorite',
                      values.notificationFavorite === 1 ? 0 : 1
                    )
                  }
                  error={
                    touched.notificationFavorite && errors.notificationFavorite
                  }
                  value={values.notificationFavorite}
                  onBlur={handleBlur}
                />
                {/* <FormSocial>
                  <p>Cadastre suas redes sociais:</p>
                  <SVG src={Facebook} uniquifyIDs={true} />
                  <SVG src={Google} uniquifyIDs={true} />
                </FormSocial> */}
              </FormGroupAlerts>
            </FormGroup>

            {errorMessage && <LoginFeedback>{errorMessage}</LoginFeedback>}

            <ButtonSave disabled={isSubmitting} type="submit">
              Salvar
            </ButtonSave>
          </Form>
        </Body>
        <UpdatePassModal
          active={changePass}
          onClose={() => setChangePass(false)}
          user={values}
        />
      </Container>
    </>
  );
}

export default Profile;
