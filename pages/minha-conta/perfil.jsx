import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
// import SVG from 'react-inlinesvg';
import * as Yup from 'yup';
import Api from 'services';

// actions
import { setUser } from 'store/modules/user/actions';

// components
import FormElements from 'components/FormElements';
import UpdatePass from 'pages/MyAccount/Profile/UpdatePass';

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
      const resp = await Api.MyAccount.putMe(user.access_token, values);

      setSubmitting(false);

      if (resp.status) {
        dispatch(setUser({ logged: true, me: values }));
        setErrorMessage('Alteração realizada com sucesso.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 300);
      } else {
        setErrorMessage(resp.msg);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    }
  });

  useEffect(() => {
    if (user.logged) {
      setFieldValue('name', user.me.name);
      setFieldValue('lastName', user.me.lastName);
      setFieldValue('email', user.me.email);
      setFieldValue('phone', user.me.phone);
      setFieldValue('notificationAlert', user.me.notificationAlert);
      setFieldValue('notificationFavorite', user.me.notificationFavorite);
    }
  }, [ user.logged ]);

  if (!user.logged || !user.me) return <Container />;

  return (
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
                onChange={() =>
                  setFieldValue(
                    'notificationAlert',
                    values.notificationAlert === 1 ? 0 : 1
                  )
                }
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
      <UpdatePass
        active={changePass}
        onClose={() => setChangePass(false)}
        user={values}
      />
    </Container>
  );
}

export default Profile;
