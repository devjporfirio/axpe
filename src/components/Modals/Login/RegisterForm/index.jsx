import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import {
  LoginFeedback,
  RegisterFormContainer
} from 'components/Modals/Login/styles';

const registerSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  passwordConfirmation: Yup.string().required(),
  phone: Yup.string(),
  terms: Yup.boolean().oneOf([ true ]).required()
});

function RegisterForm({ doAfterLogin }) {
  const dispatch = useDispatch();
  const [ registerError, setRegisterError ] = useState(null);

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
      password: '',
      passwordConfirmation: '',
      phone: '',
      terms: false
    },
    validate: values => {
      const errors = {};

      if(values.password != values.passwordConfirmation) {
        errors.password = true;
        errors.passwordConfirmation = true;
      }

      return errors;
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const response = await Api.User.postRegister({
        name: values.name,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
        phone: values.phone
      });

      if (response.status) {
        const loginResponse = await Api.User.postLogin({
          email: values.email,
          password: values.password
        });

        setSubmitting(false);

        if(loginResponse.access_token) {
          dispatch(
            setMain({
              modalLogin: false,
              modalLoginRegisterSuccess: true
            })
          );

          doAfterLogin(loginResponse);

          resetForm({});
        }

      } else if(!response.status && response.error) {
        const errorMessages = response.error.map(err => getErrorMessage(err));

        setSubmitting(false);
        setRegisterError(errorMessages.join(', '));

        setTimeout(() => {
          setRegisterError(null);
        }, 3000);
      }
    }
  });

  return (
    <RegisterFormContainer onSubmit={handleSubmit}>
      <FormElements
        type="text"
        name="name"
        label="Nome"
        placeholder="Nome:"
        onChange={handleChange}
        error={touched.name && errors.name}
        value={values.name}
        onBlur={handleBlur}
      />
      <FormElements
        type="text"
        name="lastName"
        label="Sobrenome"
        placeholder="Sobrenome:"
        onChange={handleChange}
        error={touched.lastName && errors.lastName}
        value={values.lastName}
        onBlur={handleBlur}
      />
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
      />
      <FormElements
        type="password"
        name="passwordConfirmation"
        label="Confirmar senha:"
        placeholder="Confirmar senha:"
        onChange={handleChange}
        error={touched.passwordConfirmation && errors.passwordConfirmation}
        value={values.passwordConfirmation}
        onBlur={handleBlur}
      />
      <FormElements
        type="phone"
        name="phone"
        label="Celular"
        placeholder="Celular"
        onChange={handleChange}
        error={touched.phone && errors.phone}
        value={values.phone}
        onBlur={handleBlur}
      />
      <FormElements
        type="checkboxLink"
        name="terms"
        label="Concordo com a política de privacidade da Axpe"
        onChange={handleChange}
        error={touched.terms && errors.terms}
        value={values.terms}
        checked={values.terms}
        onBlur={handleBlur}
      />
      <Button type="submit" disabled={isSubmitting} fullWidth>
        Começar
      </Button>
      {registerError && <LoginFeedback>{registerError}</LoginFeedback>}
    </RegisterFormContainer>
  )
}

export default RegisterForm;
