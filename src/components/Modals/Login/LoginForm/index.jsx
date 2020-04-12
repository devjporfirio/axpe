import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { useFormik } from 'formik';
import Api from 'services';
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
        let redirectTo = null;

        if(typeof modalLogin === 'function') {
          modalLogin();
        } else {
          redirectTo = typeof modalLogin === 'string' ? modalLogin : `/minha-conta`;
        }

        await doAfterLogin(response);

        if(redirectTo) {
          Router.push(
            redirectTo
          );
        }

        dispatch(setMain({ modalLogin: false }));
        resetForm();
      } else if (response.error) {
        const msg = getErrorMessage(response.error);

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
      {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
    </LoginFormContainer>
  );
}

export default LoginForm;
