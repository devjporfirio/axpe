import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Api from 'services';

// components
import FormElements from 'components/FormElements';

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
    password: Yup.string().when('passwordNew', {
      is: passwordNew => passwordNew,
      then: Yup.string().required()
    }),
    passwordNew: Yup.string().when('passwordConfirmation', {
      is: passwordConfirmation => passwordConfirmation,
      then: Yup.string().required()
    }),
    passwordConfirmation: Yup.string().oneOf([ Yup.ref('passwordNew') ]),
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
      password: '',
      passwordNew: '',
      passwordConfirmation: '',
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

          {!changePass && (
            <ButtonPass type="button" onClick={() => setChangePass(true)}>
              Alterar Senha
            </ButtonPass>
          )}
          {changePass && (
            <FormGroup>
              <h2>Atualizar senha</h2>
              <FormElements
                // type="password"
                name="password"
                label="Senha atual"
                placeholder="Senha atual"
                onChange={handleChange}
                error={touched.password && errors.password}
                value={values.password}
                onBlur={handleBlur}
              />
              <FormElements
                // type="password"
                name="passwordNew"
                label="Nova senha"
                placeholder="Nova senha"
                onChange={handleChange}
                error={touched.passwordNew && errors.passwordNew}
                value={values.passwordNew}
                onBlur={handleBlur}
              />
              <FormElements
                // type="password"
                name="passwordConfirmation"
                label="Confirmar senha"
                placeholder="Confirmar senha"
                onChange={handleChange}
                error={
                  touched.passwordConfirmation && errors.passwordConfirmation
                }
                value={values.passwordConfirmation}
                onBlur={handleBlur}
              />
            </FormGroup>
          )}

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
