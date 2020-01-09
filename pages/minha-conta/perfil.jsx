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
  last_name: Yup.string().required(),
  email: Yup.string().required(),
  phone: Yup.string().required(),
  notification_alert: Yup.bool().required(),
  notification_favorite: Yup.bool().required()
});

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [ changePass, setChangePass ] = useState(false);

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
      last_name: user.me.last_name,
      email: user.me.email,
      phone: user.me.phone,
      notification_alert: user.me.notification_alert,
      notification_favorite: user.me.notification_favorite
    },
    validationSchema: profileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const resp = await Api.MyAccount.putMe(user.access_token, values);

      setSubmitting(false);

      if (resp.status === 'success') {
        alert('Sucesso');
        dispatch(setUser({ logged: true, me: values }));
      }
    }
  });

  useEffect(() => {
    if (user.logged) {
      setFieldValue('name', user.me.name);
      setFieldValue('last_name', user.me.last_name);
      setFieldValue('email', user.me.email);
      setFieldValue('phone', user.me.phone);
      setFieldValue('notification_alert', user.me.notification_alert);
      setFieldValue('notification_favorite', user.me.notification_favorite);
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
                name="last_name"
                label="Sobrenome"
                placeholder="Sobrenome"
                onChange={handleChange}
                error={touched.last_name && errors.last_name}
                value={values.last_name}
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
                name="notification_alert"
                label={
                  <>
                    <strong>Meus Alertas</strong> <br />
                    Novos imóveis adicionados
                  </>
                }
                checked={values.notification_alert === 1}
                onChange={() =>
                  setFieldValue(
                    'notification_alert',
                    values.notification_alert === 1 ? 0 : 1
                  )
                }
                error={touched.notification_alert && errors.notification_alert}
                value={values.notification_alert}
                onBlur={handleBlur}
              />
              <FormElementsCheck
                type="checkbox"
                name="notification_favorite"
                label={
                  <>
                    <strong>Favoritos</strong> <br />
                    Informações atualizadas
                  </>
                }
                checked={values.notification_favorite === 1}
                onChange={() =>
                  setFieldValue(
                    'notification_favorite',
                    values.notification_favorite === 1 ? 0 : 1
                  )
                }
                error={
                  touched.notification_favorite && errors.notification_favorite
                }
                value={values.notification_favorite}
                onBlur={handleBlur}
              />
              {/* <FormSocial>
                <p>Cadastre suas redes sociais:</p>
                <SVG src={Facebook} uniquifyIDs={true} />
                <SVG src={Google} uniquifyIDs={true} />
              </FormSocial> */}
            </FormGroupAlerts>
          </FormGroup>

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
