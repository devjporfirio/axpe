import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Api from 'services';

// components
import Modal from 'components/Modals';
import Button from 'components/Button';
import FormElements from 'components/FormElements';


// store
import { setMain } from 'store/modules/main/actions';

// styles
import { Form, TextContact, ColumnContact, InfoUserContact } from './styles';
import { FormGroup } from 'components/FormElements/styles';
import {
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
      const resp = await Api.Contact.postContact({
        message: values.message,
        name: user.me.name,
        lastName: user.me.last_name,
        phone: user.me.phone,
        email: user.me.email,
        subject: 'Mais informações'
      });
      setSubmitting(false);
      if (resp.status) {
        dispatch(
          setMain({
            modalNewsletterSuccess: true,
            modalContact: false,
            modalContactMessage: ''
          })
        );
        resetForm({});
      }
    }
  });

  return (
    <Modal
      active={modalContact}
      onClose={closeModal}
      showButtonBack={showRegister}
      onClickButtonBack={onClickButtonBack}
    >
      <TextContact>
        <Text>
          <TextWrapper>
            <h2>
              Que bom que você gostou <strong>deste imóvel</strong>
            </h2>
          </TextWrapper>
        </Text>
      </TextContact>
      <ColumnContact>
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
            />

            <Button disabled={isSubmitting} type="submit" fullWidth>
              Enviar
            </Button>
          </FormGroup>
        </Form>
        <InfoUserContact />
      </ColumnContact>
    </Modal>
  );
}
