import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Api from 'services';

// helpers
import { getErrorMessage } from 'helpers/errors';

// components
import FormElements from 'components/FormElements';

// actions
import { setUserMe } from 'store/modules/user/actions';

// styles
import { FormGroup, FormFeedback } from 'components/FormElements/styles';
import { Form, ButtonSave } from 'pages/MyAccount/Profile/styles';
import {
  Container,
  Note
} from './styles';

const formSchema = Yup.object().shape({
  password: Yup.string().required(),
  passwordNew: Yup.string().required(),
  passwordConfirmation: Yup.string()
    .oneOf([ Yup.ref('passwordNew') ])
    .required()
});

function UpdatePass({ active, onClose, user }) {
  const dispatch = useDispatch();
  const userRedux = useSelector(state => state.user);
  const [ successMessage, setSuccessMessage ] = useState(false);
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
      password: '',
      passwordNew: '',
      passwordConfirmation: ''
    },
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const response = await Api.MyAccount.putMe(userRedux.access_token, {
        ...user,
        ...values
      });

      if (response.status) {
        dispatch(setUserMe(values));
        setSuccessMessage(true);
        resetForm();

        setTimeout(() => {
          setSuccessMessage(false);
          onClose();
        }, 3000);
      } else {
        const msg = getErrorMessage(response.error);

        setErrorMessage(msg);
        setSubmitting(false);

        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }

    }
  });

  return (
    <Container active={active} onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <h2>Atualizar senha</h2>
          <FormElements
            type="password"
            name="password"
            label="Senha atual"
            placeholder="Senha atual"
            onChange={handleChange}
            error={touched.password && errors.password}
            value={values.password}
            onBlur={handleBlur}
            useEye
          />
          <FormElements
            type="password"
            name="passwordNew"
            label="Nova senha"
            placeholder="Nova senha"
            onChange={handleChange}
            error={touched.passwordNew && errors.passwordNew}
            value={values.passwordNew}
            onBlur={handleBlur}
            useEye
          />
          <FormElements
            type="password"
            name="passwordConfirmation"
            label="Confirmar senha"
            placeholder="Confirmar senha"
            onChange={handleChange}
            error={touched.passwordConfirmation && errors.passwordConfirmation}
            value={values.passwordConfirmation}
            onBlur={handleBlur}
            useEye
          />
        </FormGroup>

        <Note>
          *Sua senha deve conter pelo menos 6 caracteres, um número e um
          caracter especial.
        </Note>

        {successMessage && <FormFeedback themeColor="greenLight">Senha alterada com sucesso!</FormFeedback>}
        {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}

        <ButtonSave disabled={isSubmitting} type="submit">
          Salvar
        </ButtonSave>
      </Form>
    </Container>
  );
}

export default UpdatePass;
