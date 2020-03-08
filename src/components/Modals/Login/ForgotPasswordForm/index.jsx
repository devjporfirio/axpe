import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Api from 'services';
import * as Yup from 'yup';

// components
import Button from 'components/Button';
import FormElements from 'components/FormElements';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import {
  LoginFeedback
} from 'components/Modals/Login/styles';

import {
  FormContainer
} from './styles';

const formSchema = Yup.object().shape({
  email: Yup.string().required()
});

function ForgotPasswordForm() {
  const dispatch = useDispatch();
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
      email: ''
    },
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const response = await Api.User.postForgotPassword(values);

      if (response) {
        dispatch(setMain({
          modalLogin: false,
          modalForgotPasswordSuccess: true
        }));
        resetForm();
      } else if(response.error) {
        let errorMessage = null;

        setSubmitting(false);

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
    <FormContainer onSubmit={handleSubmit}>
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
      <Button disabled={isSubmitting} type="submit" fullWidth>
        Enviar
      </Button>
      {errorMessage && <LoginFeedback>{errorMessage}</LoginFeedback>}
    </FormContainer>
  )
}

export default ForgotPasswordForm;
