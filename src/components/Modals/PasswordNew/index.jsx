import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GTM from 'helpers/gtm';
import Api from 'services';

// helpers
import { getErrorMessage } from 'helpers/errors';

// actions
import { setMain } from 'store/modules/main/actions';
import { setUserMe } from 'store/modules/user/actions';

// components
import FormElements from 'components/FormElements';

// styles
import { FormGroup, FormFeedback } from 'components/FormElements/styles';
import { Form, ButtonSave } from 'pages/MyAccount/Profile/styles';
import { Container, Note } from './styles';

const formSchema = Yup.object().shape({
  passwordNew: Yup.string().required(),
  passwordConf: Yup.string()
    .oneOf([ Yup.ref('passwordNew') ])
    .required()
});

function PasswordNew({ hash }) {
  const dispatch = useDispatch();
  const { modalPasswordNew } = useSelector(state => state.main);
  const [ successMessage, setSuccessMessage ] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const closeModal = useCallback(() => {
    dispatch(setMain({ modalPasswordNew: false }))
  }, [ modalPasswordNew ]);

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
      passwordNew: '',
      passwordConf: ''
    },
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const response = await Api.User.postChangePassword(values);

      setErrorMessage(false);
      setSubmitting(false);

      if (response.status) {
        dispatch(setUserMe(values));
        resetForm();

        GTM.dataLayerPush({
          event: 'Form Response',
          formType: 'Nova Senha',
          formResult: 'Sucesso',
          formMessage: ''
        });

        setTimeout(() => {
          setSuccessMessage(false);
          closeModal();
        }, 3000);
      } else {
        const msg = getErrorMessage(response.error);

        GTM.dataLayerPush({
          event: 'Form Response',
          formType: 'Nova Senha',
          formResult: 'Erro',
          formMessage: msg
        });

        setErrorMessage(msg);

        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }

    }
  });

  return modalPasswordNew ? (
    <Container
      active={modalPasswordNew}
      onClose={closeModal}
      dataType="Nova Senha"
    >
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <h2>Crie uma nova senha</h2>
          <FormElements
            type="password"
            name="passwordNew"
            label="Nova senha"
            placeholder="Nova senha"
            onChange={handleChange}
            error={touched.passwordNew && errors.passwordNew}
            value={values.passwordNew}
            onBlur={handleBlur}
            className="holos-form-field"
            data-label="Nova senha"
            data-type="Nova senha"
            useEye
          />
          <FormElements
            type="password"
            name="passwordConf"
            label="Confirmar senha"
            placeholder="Confirmar senha"
            onChange={handleChange}
            error={touched.passwordConf && errors.passwordConf}
            value={values.passwordConf}
            onBlur={handleBlur}
            className="holos-form-field"
            data-label="Confirmar senha"
            data-type="Confirmar senha"
            useEye
          />
        </FormGroup>

        <Note>
          *Sua senha deve conter pelo menos 6 caracteres, um número e um
          caracter especial.
        </Note>

        {successMessage && <FormFeedback>Senha alterada com sucesso!</FormFeedback>}
        {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}

        <ButtonSave
          disabled={isSubmitting}
          type="submit"
          className="holos-form-submit"
          data-type="Nova senha"
        >
          Salvar
        </ButtonSave>
      </Form>
    </Container>
  ) : null;
}

export default PasswordNew;
