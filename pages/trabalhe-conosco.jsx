import React from 'react';
import FormElements from 'components/FormElements';
import { FormGroup, FormGroupYesNo } from 'components/FormElements/styles';
import {
  Container,
  Form,
  FormGroupButton,
  FormGroupBrokerExperience,
  ButtonContainer,
  FormGroupBasics,
  FormGroupLang
} from 'pages/Work/styles';
import { useFormik } from 'formik';
import Api from 'services';
import * as Yup from 'yup';

function Work() {
  const linkPolitics = <a href="/politica">política de privacidade</a>;

  const workSchema = Yup.object().shape({
    brokerExperience: Yup.string().required(),
    haveBelieved: Yup.string().required(),
    name: Yup.string()
      .min(2)
      .required(),
    lastName: Yup.string()
      .min(2)
      .required(),
    cpf: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    phone: Yup.string().required(),
    mobile: Yup.string().required(),
    linkedin: Yup.string(),
    facebook: Yup.string(),
    instagram: Yup.string(),
    twitter: Yup.string(),
    anotherSocialNetwork: Yup.string(),
    lang1: Yup.string(),
    lang2: Yup.string(),
    lang3: Yup.string(),
    lang4: Yup.string(),
    previousExperiences: Yup.string().required(),
    reasonWorkAxpe: Yup.string().required(),
    wasIndicated: Yup.boolean(),
    whoIndicated: Yup.string(),
    terms: Yup.boolean()
      .oneOf([ true ])
      .required()
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    initialValues: {
      brokerExperience: '',
      haveBelieved: '',
      name: '',
      lastName: '',
      cpf: '',
      email: '',
      phone: '',
      mobile: '',
      linkedin: '',
      facebook: '',
      instagram: '',
      twitter: '',
      anotherSocialNetwork: '',
      lang1: '',
      lang2: '',
      lang3: '',
      lang4: '',
      previousExperiences: '',
      reasonWorkAxpe: '',
      wasIndicated: '',
      whoIndicated: '',
      terms: false
    },
    validationSchema: workSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const resp = await Api.Contact.postWorkWithUs(values);
      setSubmitting(false);
      if (resp.status === 'success') {
        alert(resp.status);
        resetForm({});
      }
    }
  });

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Quero trabalhar na Axpe</h1>
        <FormGroup>
          <h2>Você já trabalhou ou trabalha como corretor de imóveis?*</h2>
          <FormGroupBrokerExperience>
            <FormElements
              name="brokerExperience"
              type="checkbox"
              label="Não"
              checked={values.brokerExperience === 'Não'}
              onChange={() => setFieldValue('brokerExperience', 'Não')}
              error={touched.brokerExperience && errors.brokerExperience}
              value={values.brokerExperience}
              onBlur={handleBlur}
            />
            <FormElements
              name="brokerExperience"
              type="checkbox"
              label="Sim, em imobiliária"
              checked={values.brokerExperience === 'Sim, em imobiliária'}
              onChange={() =>
                setFieldValue('brokerExperience', 'Sim, em imobiliária')
              }
              error={touched.brokerExperience && errors.brokerExperience}
              value={values.brokerExperience}
              onBlur={handleBlur}
            />
            <FormElements
              name="brokerExperience"
              type="checkbox"
              label="Sim, como autônomo"
              checked={values.brokerExperience === 'Sim, como autônomo'}
              onChange={() =>
                setFieldValue('brokerExperience', 'Sim, como autônomo')
              }
              error={touched.brokerExperience && errors.brokerExperience}
              value={values.brokerExperience}
              onBlur={handleBlur}
            />
          </FormGroupBrokerExperience>
        </FormGroup>

        <FormGroup>
          <h2>POSSUI CRECI?*</h2>
          <FormGroupYesNo>
            <FormElements
              name="haveBelieved"
              type="checkbox"
              label="Não"
              checked={values.haveBelieved === false}
              onChange={() => setFieldValue('haveBelieved', false)}
              error={touched.haveBelieved && errors.haveBelieved}
              value={values.haveBelieved}
              onBlur={handleBlur}
            />
            <FormElements
              name="haveBelieved"
              type="checkbox"
              label="Sim"
              checked={values.haveBelieved}
              onChange={() => setFieldValue('haveBelieved', true)}
              error={touched.haveBelieved && errors.haveBelieved}
              value={values.haveBelieved}
              onBlur={handleBlur}
            />
          </FormGroupYesNo>
        </FormGroup>

        <FormGroup>
          <h2>SEUS DADOS BÁSICOS*</h2>
          <FormGroupBasics>
            <FormElements
              name="name"
              label="Nome"
              placeholder="Nome"
              onChange={handleChange}
              error={touched.name && errors.name}
              value={values.name}
              onBlur={handleBlur}
            />
            <FormElements
              name="lastName"
              label="Sobrenome"
              placeholder="Sobrenome"
              onChange={handleChange}
              error={touched.lastName && errors.lastName}
              value={values.lastName}
              onBlur={handleBlur}
            />
            <FormElements
              type="cpf"
              name="cpf"
              label="CPF"
              placeholder="CPF"
              onChange={handleChange}
              error={touched.cpf && errors.cpf}
              value={values.cpf}
              onBlur={handleBlur}
            />
            <FormElements
              type="emailmask"
              name="email"
              label="E-mail pessoal"
              placeholder="E-mail pessoal"
              onChange={handleChange}
              error={touched.email && errors.email}
              value={values.email}
              onBlur={handleBlur}
            />
            <FormElements
              type="phone"
              name="phone"
              label="Telefone"
              placeholder="Telefone"
              onChange={handleChange}
              error={touched.phone && errors.phone}
              value={values.phone}
              onBlur={handleBlur}
            />
            <FormElements
              type="phone"
              name="mobile"
              label="Celular"
              placeholder="Celular"
              onChange={handleChange}
              error={touched.mobile && errors.mobile}
              value={values.mobile}
              onBlur={handleBlur}
            />
          </FormGroupBasics>
        </FormGroup>

        <FormGroup>
          <h2>REDES SOCIAIS NAS QUAIS VOCÊ ESTÁ</h2>
          <FormElements
            name="linkedin"
            label="Linkedin"
            placeholder="copie e cole o link do seu perfil aqui"
            onChange={handleChange}
          />
          <FormElements
            name="facebook"
            label="Facebook"
            placeholder="copie e cole o link do seu perfil aqui"
            onChange={handleChange}
          />
          <FormElements
            name="instagram"
            label="Instagram"
            placeholder="copie e cole o link do seu perfil aqui"
            onChange={handleChange}
          />
          <FormElements
            name="twitter"
            label="Twitter"
            placeholder="copie e cole o link do seu perfil aqui"
            onChange={handleChange}
          />
          <FormElements
            name="anotherSocialNetwork"
            label="Outras"
            placeholder="copie e cole o link do seu perfil aqui"
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <h2>idiomas que falo fluentemente</h2>
          <FormGroupLang>
            <FormElements
              name="lang1"
              label="Idioma"
              placeholder="Idioma"
              onChange={handleChange}
            />
            <FormElements
              name="lang2"
              label="Idioma"
              placeholder="Idioma"
              onChange={handleChange}
            />
            <FormElements
              name="lang3"
              label="Idioma"
              placeholder="Idioma"
              onChange={handleChange}
            />
            <FormElements
              name="lang4"
              label="Idioma"
              placeholder="Idioma"
              onChange={handleChange}
            />
          </FormGroupLang>
        </FormGroup>

        <FormGroup>
          <h2>experiências anteriores na área comercial de empresas:*</h2>
          <FormElements
            type="area"
            name="previousExperiences"
            placeholder="Comente sobre suas experiências anteriores"
            onChange={handleChange}
            error={touched.previousExperiences && errors.previousExperiences}
            value={values.previousExperiences}
            onBlur={handleBlur}
          />
        </FormGroup>
        <FormGroup>
          <h2>por que gostaria de trabalhar conosco?*</h2>
          <FormElements
            type="area"
            name="reasonWorkAxpe"
            placeholder="Comente sobre suas experiências anteriores"
            onChange={handleChange}
            error={touched.reasonWorkAxpe && errors.reasonWorkAxpe}
            value={values.reasonWorkAxpe}
            onBlur={handleBlur}
          />
        </FormGroup>
        <FormGroup>
          <h2>conhece alguém na Axpe?</h2>
          <FormGroupYesNo>
            <FormElements
              name="wasIndicated"
              type="checkbox"
              label="Não"
              checked={values.wasIndicated === false}
              onChange={() => setFieldValue('wasIndicated', false)}
            />
            <FormElements
              name="wasIndicated"
              type="checkbox"
              label="Sim"
              checked={values.wasIndicated}
              onChange={() => setFieldValue('wasIndicated', true)}
            />
          </FormGroupYesNo>
          {values.wasIndicated && (
            <FormElements
              name="whoIndicated"
              placeholder="Quem?"
              label="Quem?"
              onChange={handleChange}
            />
          )}
        </FormGroup>
        <FormGroupButton>
          <FormElements
            type="checkboxLink"
            name="terms"
            label={<>Concordo com a {linkPolitics} da Axpe.</>}
            onChange={handleChange}
            error={touched.terms && errors.terms}
            value={values.terms}
            checked={values.terms}
            onBlur={handleBlur}
          />
          <ButtonContainer disabled={isSubmitting} type="submit">
            Enviar
          </ButtonContainer>
        </FormGroupButton>
      </Form>
    </Container>
  );
}

export default Work;
