import React, { useState } from 'react';
import Router from 'next/router';
import { useFormik } from 'formik';
import Api from 'services';
import * as Yup from 'yup';

// components
import Button from 'components/Button';
import FormElements from 'components/FormElements';

// styles
import {
  LoginFeedback,
  LoginFormContainer
} from 'components/Modals/Login/styles';

const loginSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required()
});

function LoginForm({ doAfterLogin }) {
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
    onSubmit: async (values, { setSubmitting }) => {
      const response = await Api.User.postLogin(values);

      setSubmitting(false);

      if (response.access_token) {
        doAfterLogin(response);
        Router.push(`/minha-conta`);
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
        setErrorMessage(errorMessage);
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
      {errorMessage && <LoginFeedback>{errorMessage}</LoginFeedback>}
    </LoginFormContainer>
  )
}

export default LoginForm;
