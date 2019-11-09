import React from 'react';
import FormElements from 'components/FormElements';

import { FormGroup } from 'components/FormElements/styles';
import { Container, Form, FormGroupButton, ButtonContainer } from 'pages/Work/styles';

function Work() {
  const linkPolitics = <a href="/politica">política de privacidade</a>;
  return (
    <Container>
      <Form>
        <h1>Quero trabalhar na Axpe</h1>
        <FormGroup>
          <h2>Você já trabalhou ou trabalha como corretor de imóveis?*</h2>
          <FormElements name="brokerExperience" type="checkbox" label="Não" />
          <FormElements
            name="brokerExperience"
            type="checkbox"
            label="Sim, em imobiliária"
          />
          <FormElements
            name="brokerExperience"
            type="checkbox"
            label="Sim, como autônomo"
          />
        </FormGroup>

        <FormGroup>
          <h2>POSSUI CRECI?*</h2>
          <FormElements name="haveBelieved" type="checkbox" label="Não" />
          <FormElements name="haveBelieved" type="checkbox" label="Sim" />
        </FormGroup>

        <FormGroup>
          <h2>SEUS DADOS BÁSICOS*</h2>
          <FormElements name="name" label="Nome" placeholder="Nome" />
          <FormElements
            name="lastName"
            label="Sobrenome"
            placeholder="Sobrenome"
          />
          <FormElements name="cpf" label="CPF" placeholder="CPF" />
          <FormElements
            type="email"
            name="email"
            label="E-mail pessoal"
            placeholder="E-mail pessoal"
          />
          <FormElements
            type="phone"
            name="phone"
            label="Telefone"
            placeholder="Telefone"
          />
          <FormElements
            type="phone"
            name="mobile"
            label="Celular"
            placeholder="Celular"
          />
        </FormGroup>

        <FormGroup>
          <h2>REDES SOCIAIS NAS QUAIS VOCÊ ESTÁ</h2>
          <FormElements
            name="linkedin"
            label="Linkedin"
            placeholder="copie e cole o link do seu perfil aqui"
          />
          <FormElements
            name="facebook"
            label="Facebook"
            placeholder="copie e cole o link do seu perfil aqui"
          />
          <FormElements
            name="instagram"
            label="Instagram"
            placeholder="copie e cole o link do seu perfil aqui"
          />
          <FormElements
            name="twitter"
            label="Twitter"
            placeholder="copie e cole o link do seu perfil aqui"
          />
          <FormElements
            name="anotherSocialNetwork"
            label="Outras"
            placeholder="copie e cole o link do seu perfil aqui"
          />
        </FormGroup>

        <FormGroup>
          <h2>idiomas que falo fluentemente</h2>
          <FormElements name="lang" label="Idioma" placeholder="Idioma" />
          <FormElements name="lang" label="Idioma" placeholder="Idioma" />
          <FormElements name="lang" label="Idioma" placeholder="Idioma" />
          <FormElements name="lang" label="Idioma" placeholder="Idioma" />
        </FormGroup>

        <FormGroup>
          <h2>experiências anteriores na área comercial de empresas:*</h2>
          <FormElements
            type="area"
            name="previousExperiences"
            placeholder="Comente sobre suas experiências anteriores"
          />
        </FormGroup>
        <FormGroup>
          <h2>por que gostaria de trabalhar conosco?*</h2>
          <FormElements
            type="area"
            name="reasonWorkAxpe"
            placeholder="Comente sobre suas experiências anteriores"
          />
        </FormGroup>
        <FormGroup>
          <h2>conhece alguém na Axpe?</h2>
          <FormElements name="wasIndicated" type="checkbox" label="Não" />
          <FormElements name="wasIndicated" type="checkbox" label="Sim" />
          <FormElements name="facebook" placeholder="Quem?" />
        </FormGroup>
      </Form>
      <FormGroupButton>
        <FormElements
          type="checkbox"
          name="politica"
          label={<>Concordo com a {linkPolitics} da Axpe.</>}
        />
        <ButtonContainer type="button">Enviar</ButtonContainer>
      </FormGroupButton>
    </Container>
  );
}

export default Work;
