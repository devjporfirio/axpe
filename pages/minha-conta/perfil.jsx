import React, { useState, useEffect } from 'react';
// import SVG from 'react-inlinesvg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Api from 'services';
import { useSelector, useDispatch } from 'react-redux';

// components
import FormElements from 'components/FormElements';
import UpdatePass from 'pages/MyAccount/Profile/UpdatePass';

// actions
import { setMain } from 'store/modules/main/actions';

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
  lastName: Yup.string().required(),
  email: Yup.string().required(),
  phone: Yup.string().required(),
  notification_alert: Yup.bool().required(),
  notification_favorite: Yup.bool().required()
});

function Profile({}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [ changePass, setChangePass ] = useState(false);
  const [ me, setMe ] = useState({});

  useEffect(() => {
    async function loadMe() {
      if (user && user.logged) {
        dispatch(setMain({ modalLogin: false }));
        const me = await Api.MyAccount.getMe(user.access_token);
        setMe(me.data);
      } else {
        dispatch(setMain({ modalLogin: true }));
      }
    }

    loadMe();
  }, [ user ]);

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
      name: '',
      lastName: '',
      email: '',
      phone: '',
      notification_alert: '',
      notification_favorite: ''
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

  if(!user.logged) return null;

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
                value={me.name || ''}
                onBlur={handleBlur}
              />
              <FormElements
                name="lastName"
                label="Sobrenome"
                placeholder="Sobrenome"
                onChange={handleChange}
                error={touched.lastName && errors.lastName}
                value={me.last_name || ''}
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
                value={me.email}
                onBlur={handleBlur}
              />
              <FormElements
                type="phone"
                name="phone"
                label="Telefone"
                placeholder="Telefone"
                onChange={handleChange}
                error={touched.phone && errors.phone}
                value={me.phone}
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
                value={me.notification_alert}
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
                value={me.notification_favorite}
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
