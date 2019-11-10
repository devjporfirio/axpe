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

function Work() {
  const linkPolitics = <a href="/politica">política de privacidade</a>;

  const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
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
    onSubmit: async values => {
      if (!values.terms) {
        alert('Concorde com os termos :D');
        return;
      }
      const resp = await Api.Contact.postWorkWithUs(values);
      if (resp.status === 'success') {
        alert(resp.status);
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
            />
            <FormElements
              name="brokerExperience"
              type="checkbox"
              label="Sim, em imobiliária"
              checked={values.brokerExperience === 'Sim, em imobiliária'}
              onChange={() =>
                setFieldValue('brokerExperience', 'Sim, em imobiliária')
              }
            />
            <FormElements
              name="brokerExperience"
              type="checkbox"
              label="Sim, como autônomo"
              checked={values.brokerExperience === 'Sim, como autônomo'}
              onChange={() =>
                setFieldValue('brokerExperience', 'Sim, como autônomo')
              }
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
            />
            <FormElements
              name="haveBelieved"
              type="checkbox"
              label="Sim"
              checked={values.haveBelieved}
              onChange={() => setFieldValue('haveBelieved', true)}
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
            />
            <FormElements
              name="lastName"
              label="Sobrenome"
              placeholder="Sobrenome"
              onChange={handleChange}
            />
            <FormElements
              type="cpf"
              name="cpf"
              label="CPF"
              placeholder="CPF"
              onChange={handleChange}
            />
            <FormElements
              type="emailmask"
              name="email"
              label="E-mail pessoal"
              placeholder="E-mail pessoal"
              onChange={handleChange}
            />
            <FormElements
              type="phone"
              name="phone"
              label="Telefone"
              placeholder="Telefone"
              onChange={handleChange}
            />
            <FormElements
              type="phone"
              name="mobile"
              label="Celular"
              placeholder="Celular"
              onChange={handleChange}
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
          />
        </FormGroup>
        <FormGroup>
          <h2>por que gostaria de trabalhar conosco?*</h2>
          <FormElements
            type="area"
            name="reasonWorkAxpe"
            placeholder="Comente sobre suas experiências anteriores"
            onChange={handleChange}
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
            checked={values.terms}
            onChange={() => setFieldValue('terms', !values.terms)}
          />
          <ButtonContainer type="submit">Enviar</ButtonContainer>
        </FormGroupButton>
      </Form>
    </Container>
  );
}

export default Work;
