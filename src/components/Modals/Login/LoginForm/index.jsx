import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { useFormik } from 'formik';
import Api from 'services';
import GTM from 'helpers/gtm';
import * as Yup from 'yup';

// helpers
import { getErrorMessage } from 'helpers/errors';

// actions
import { setMain } from 'store/modules/main/actions';

// components
import Button from 'components/Button';
import FormElements from 'components/FormElements';

// styles
import { FormFeedback } from 'components/FormElements/styles';

import { LoginFormContainer } from 'components/Modals/Login/styles';

const loginSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required()
});

function LoginForm({ doAfterLogin }) {
  const dispatch = useDispatch();
  const { modalLogin } = useSelector(state => state.main);
  const [ errorMessage, setErrorMessage ] = useState(null);

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

      if (response.access_token) {
        GTM.dataLayerPush({
          event: 'Form Response',
          formType: 'Login',
          formResult: 'Sucesso',
          formMessage: ''
        });

        await doAfterLogin(response);

        if(typeof modalLogin === 'function') {
          modalLogin(response.access_token);
        } else if(typeof modalLogin === 'string') {
          Router.push(
            modalLogin
          );
        }

        dispatch(setMain({
          modalLoginType: null,
          modalLogin: false
        }));

        resetForm();
      } else if (response.error) {
        const msg = getErrorMessage(response.error);

        GTM.dataLayerPush({
          event: 'Form Response',
          formType: 'Login',
          formResult: 'Erro',
          formMessage: msg
        });

        setSubmitting(false);
        setErrorMessage(msg);

        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    }
  });

  return (
    <LoginFormContainer onSubmit={handleSubmit}>
      <FormElements
        type="emailmask"
        name="email"
        label="E-mail:"
        placeholder="E-mail"
        onChange={handleChange}
        error={touched.email && errors.email}
        value={values.email}
        onBlur={handleBlur}
        className="holos-form-field"
        data-label="E-mail"
        data-type="Login"
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
        className="holos-form-field"
        data-label="Senha"
        data-type="Login"
        useEye
      />
      <Button
        className="holos-form-submit"
        data-type="Login"
        disabled={isSubmitting}
        type="submit"
        fullWidth
      >
        Entrar
      </Button>
      {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
    </LoginFormContainer>
  );
}

export default LoginForm;
