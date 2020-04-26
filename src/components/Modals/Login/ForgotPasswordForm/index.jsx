import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Api from 'services';
import * as Yup from 'yup';

// helpers
import { getErrorMessage } from 'helpers/errors';

// components
import Button from 'components/Button';
import FormElements from 'components/FormElements';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import {
  FormFeedback
} from 'components/FormElements/styles';

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
        className="holos-form-field"
        data-label="E-mail"
        data-type="Recuperar Senha"
      />
      <Button
        className="holos-form-submit"
        data-type="Recuperar Senha"
        disabled={isSubmitting}
        type="submit"
        fullWidth
      >
        Enviar
      </Button>
      {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
    </FormContainer>
  )
}

export default ForgotPasswordForm;
