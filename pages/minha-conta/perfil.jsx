import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Api from 'services';

// components
import FormElements from 'components/FormElements';
import UpdatePass from 'pages/MyAccount/Profile/UpdatePass';

// icons
import Facebook from 'assets/icons/facebook-rounded';
import Google from 'assets/icons/google-rounded';

// styles
import { FormGroup } from 'components/FormElements/styles';
import {
  Container,
  Body,
  Form,
  ButtonPass,
  ButtonSave,
  FormElementsCheck,
  FormSocial,
  FormGroupElements,
  FormGroupAlerts
} from 'pages/MyAccount/Profile/styles';

function Profile({ me }) {
  const [ changePass, setChangePass ] = useState(false);
  const profileSchema = Yup.object().shape({
    name: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.string().required(),
    notification_alert: Yup.bool().required(),
    notification_favorite: Yup.bool().required()
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
      name: (me && me.name) || '',
      lastName: (me && me.last_name) || '',
      email: (me && me.email) || '',
      phone: (me && me.phone) || '',
      notification_alert: (me && me.notification_alert) || '',
      notification_favorite: (me && me.notification_favorite) || ''
    },
    validationSchema: profileSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const resp = await Api.MyAccount.putMe(values);
      setSubmitting(false);
      if (resp.status === 'success') {
        alert('Sucesso');
        // dispatch(
        //   setMain({
        //     modalRegisterSuccess: true
        //   })
        // );
        resetForm({});
      }
    }
  });
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
                name="notification_alert"
                label={
                  <>
                    <strong>Meus Alertas</strong> <br />
                    Novos imóveis adicionados
                  </>
                }
                onChange={handleChange}
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
                onChange={handleChange}
                error={
                  touched.notification_favorite && errors.notification_favorite
                }
                value={values.notification_favorite}
                onBlur={handleBlur}
              />
              <FormSocial>
                <p>Cadastre suas redes sociais:</p>
                <SVG src={Facebook} uniquifyIDs={true} />
                <SVG src={Google} uniquifyIDs={true} />
              </FormSocial>
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

Profile.getInitialProps = async ({}) => {
  const me = await Api.MyAccount.getMe();
  return {
    me: me.data
  };
};

export default Profile;
