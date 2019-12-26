import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Api from 'services';

// components
import FormElements from 'components/FormElements';

// styles
import { FormGroup } from 'components/FormElements/styles';
import { Form, ButtonSave } from '../styles';
import { Container, Note } from './styles';

export default function UpdatePass({ active, onClose, user }) {
  const profileSchema = Yup.object().shape({
    password: Yup.string().when('passwordNew', {
      is: passwordNew => passwordNew,
      then: Yup.string().required()
    }),
    passwordNew: Yup.string().when('passwordConfirmation', {
      is: passwordConfirmation => passwordConfirmation,
      then: Yup.string().required()
    }),
    passwordConfirmation: Yup.string().oneOf([ Yup.ref('passwordNew') ])
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
      password: '',
      passwordNew: '',
      passwordConfirmation: ''
    },
    validationSchema: profileSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const resp = await Api.MyAccount.putMe({ ...user, ...values });
      setSubmitting(false);
      if (resp.status === 'success') {
        alert('Sucesso');
        // dispatch(
        //   setMain({
        //     modalRegisterSuccess: true
        //   })
        // );
        onClose();
        resetForm({});
      }
    }
  });

  return (
    <Container active={active} onClose={onClose}>
      <Form onSubmit={handleSubmit}>
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
            error={touched.passwordConfirmation && errors.passwordConfirmation}
            value={values.passwordConfirmation}
            onBlur={handleBlur}
          />
        </FormGroup>

        <Note>
          *Sua senha deve conter pelo menos 6 caracteres, um número e um
          caracter especial.
        </Note>

        <ButtonSave disabled={isSubmitting} type="submit">
          Salvar
        </ButtonSave>
      </Form>
    </Container>
  );
}
