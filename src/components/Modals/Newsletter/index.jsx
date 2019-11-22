import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// components
import Modal from 'components/Modals';
import Slider from 'components/Slider';
import Button from 'components/Button';
import FormElements from 'components/FormElements';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import { Texts, Text, TextWrapper, Column, ColumnTitle } from 'components/Modals/styles';
import { FormGroup } from 'components/FormElements/styles';
import { FormContainer } from './styles';

const newsletterSchema = Yup.object().shape({
  name: Yup.string().min(2).required(),
  lastname: Yup.string().min(2).required(),
  email: Yup.string().email().required()
});

function NewsletterModal() {
  const dispatch = useDispatch();
  const { modalNewsletter } = useSelector(state => state.main);
  const { handleChange, handleBlur, handleSubmit, isSubmitting, values, touched, errors } = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
    },
    validationSchema: newsletterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await new Promise(resolve => {
        setTimeout(() => {
          setSubmitting(false);
          dispatch(setMain({
            modalNewsletter: false,
            modalNewsletterSuccess: true
          }));
          resolve();
        }, 3000);
      });
    }
  });

  const closeModal = useCallback(() => {
    dispatch(setMain({ modalNewsletter: false }))
  }, [ modalNewsletter ])

  return (
    <Modal active={modalNewsletter} onClose={closeModal}>
      <Texts>
        <Slider propsArrow={{ color: 'white' }}>
          <Text>
            <TextWrapper>
              <h2><strong>Cadastre-se</strong> para receber nossas novidades em <span>primeira mão.</span></h2>
            </TextWrapper>
          </Text>
        </Slider>
      </Texts>
      <Column>
        <FormContainer onSubmit={handleSubmit}>
          <ColumnTitle>Por favor, preencha seus dados abaixo</ColumnTitle>
          <FormGroup>
            <FormElements
              name="name"
              label="Nome"
              placeholder="Nome"
              themeColor="dark"
              error={touched.name && errors.name}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormGroup>
            <FormElements
              name="lastname"
              label="Sobrenome"
              placeholder="Sobrenome"
              themeColor="dark"
              error={touched.lastname && errors.lastname}
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormGroup>
            <FormElements
              name="email"
              label="E-mail"
              placeholder="E-mail"
              themeColor="dark"
              error={touched.email && errors.email}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormGroup>
          <Button type="submit" disabled={isSubmitting} fullWidth={true}>Começar</Button>
        </FormContainer>
      </Column>
    </Modal>
  )
}

export default NewsletterModal
