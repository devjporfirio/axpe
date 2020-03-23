import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Api from 'services';

// components
import FormElements from 'components/FormElements';

// styles
import { FormGroup, FormFeedback } from 'components/FormElements/styles';
import { Form, ButtonSave } from 'pages/MyAccount/Profile/styles';
import { Container, Note } from './styles';

const formSchema = Yup.object().shape({
  passwordConf: Yup.string().required(),
  passwordNew: Yup.string().required(),
  passwordNewConfirmation: Yup.string()
    .oneOf([ Yup.ref('passwordNew') ])
    .required()
});

function PasswordNew({ active, onClose, hash }) {
  const dispatch = useDispatch();
  const { modalPasswordNew } = useSelector(state => state.main);
  const [ successMessage, setSuccessMessage ] = useState(null);
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
      hash,
      passwordConf: '',
      passwordNew: '',
      passwordNewConfirmation: ''
    },
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const response = await Api.User.postChangePassword(values);

      setErrorMessage(false);
      setSubmitting(false);

      if (response.status) {
        dispatch(setUserMe(values));
        resetForm();

        setTimeout(() => {
          setSuccessMessage(false);
          onClose();
        }, 3000);
      } else {
        setErrorMessage(response.msg);

        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }

    }
  });

  return modalPasswordNew ? (
    <Container active={modalPasswordNew} onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <h2>Crie uma nova senha</h2>
          <FormElements
            type="password"
            name="passwordConf"
            label="Senha atual"
            placeholder="Senha atual"
            onChange={handleChange}
            error={touched.passwordConf && errors.passwordConf}
            value={values.passwordConf}
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
            name="passwordNewConfirmation"
            label="Confirmar senha"
            placeholder="Confirmar senha"
            onChange={handleChange}
            error={touched.passwordNewConfirmation && errors.passwordNewConfirmation}
            value={values.passwordNewConfirmation}
            onBlur={handleBlur}
            useEye
          />
        </FormGroup>

        <Note>
          *Sua senha deve conter pelo menos 6 caracteres, um número e um
          caracter especial.
        </Note>

        {successMessage && <FormFeedback>Senha alterada com sucesso!</FormFeedback>}
        {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}

        <ButtonSave disabled={isSubmitting} type="submit">
          Salvar
        </ButtonSave>
      </Form>
    </Container>
  ) : null;
}

export default PasswordNew;
