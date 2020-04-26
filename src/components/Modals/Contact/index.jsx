import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GTM from 'helpers/gtm';
import Api from 'services';

// components
import Modal from 'components/Modals';
import Button from 'components/Button';
import FormElements from 'components/FormElements';
import UserInfo from 'components/UserInfo';

// store
import { setMain } from 'store/modules/main/actions';

// styles
import { Form } from './styles';
import { FormGroup } from 'components/FormElements/styles';
import {
  Texts,
  Column,
  Text,
  TextWrapper,
  ColumnTitle
} from 'components/Modals/styles';

export default function Contact() {
  const dispatch = useDispatch();
  const { modalContact, modalContactMessage } = useSelector(
    state => state.main
  );
  const user = useSelector(state => state.user);
  const [ showRegister, setShowRegister ] = useState(false);

  const closeModal = useCallback(() => {
    dispatch(setMain({ modalContact: false }));
  }, [ modalContact ]);

  const onClickButtonBack = useCallback(() => {
    setShowRegister(false);
  }, []);

  const contactSchema = Yup.object().shape({
    message: Yup.string()
      .min(2)
      .required()
  });

  useEffect(() => {
    if (user.logged) {
      setFieldValue('message', modalContactMessage);
    }
  }, [ modalContact ]);

  const {
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    touched,
    errors
  } = useFormik({
    initialValues: {
      message: ''
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const response = await Api.Contact.postContact({
        message: values.message,
        name: user.me.name,
        lastName: user.me.lastName,
        phone: user.me.phone,
        email: user.me.email,
        subject: 'Mais informações'
      });

      setSubmitting(false);

      if (response.status) {
        dispatch(
          setMain({
            modalNewsletterSuccess: true,
            modalContact: false,
            modalContactMessage: ''
          })
        );

        GTM.dataLayerPush({
          event: 'Form Response',
          formType: 'Favorito - Agendar',
          formResult: 'Sucesso',
          formMessage: ''
        });

        resetForm({});
      }
    }
  });

  return modalContact ? (
    <Modal
      active={modalContact}
      onClose={closeModal}
      showButtonBack={showRegister}
      onClickButtonBack={onClickButtonBack}
      dataType="Favorito - Agendar"
    >
      <Texts>
        <Text>
          <TextWrapper>
            <h2>
              Que bom que você gostou <strong>deste imóvel</strong>
            </h2>
          </TextWrapper>
        </Text>
      </Texts>
      <Column>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <ColumnTitle>Quer mais informações sobre este imóvel?</ColumnTitle>
            <FormElements
              type="area"
              name="message"
              onChange={handleChange}
              error={touched.message && errors.message}
              value={values.message}
              onBlur={handleBlur}
              className="holos-form-field"
              data-label="Quer mais informações sobre este imóvel?"
              data-type="Favorito - Agendar"
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              className="holos-form-submit"
              data-type="Favorito - Agendar"
              fullWidth
            >
              Enviar
            </Button>
          </FormGroup>
        </Form>
        <UserInfo asInclude={true} />
      </Column>
    </Modal>
  ) : null;
}
