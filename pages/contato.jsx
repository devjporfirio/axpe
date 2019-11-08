import React from 'react';
import BlockHighlighted from 'components/BlockHighlighted';
import FormElements from 'components/FormElements';

import {
  ButtonContainer,
  Container,
  Header,
  Body,
  BlockForm,
  Numbers,
  PhoneNumber,
  Tel,
  Message,
  Whats,
  Form,
  FormGroup,
  FormGroupButton,
  Mapa
} from 'pages/Contact/styles';

function Contact() {
  const linkPolitics = <a href="/politica">política de privacidade</a>;

  return (
    <Container>
      <Header>
        <BlockHighlighted type="contact" />
        <Numbers>
          <PhoneNumber>
            <p>Se preferir ligue:</p>
            <Tel flag="tel" />
          </PhoneNumber>
          <PhoneNumber>
            <p>Whatsapp:</p>
            <Whats flag="whats" showIcon />
          </PhoneNumber>
        </Numbers>
      </Header>
      <Body>
        <BlockForm>
          <Message>
            Esse é sua linha direta para falar com a gente sobre qualquer
            assunto. Pedir um imóvel bem específico, tirar dúvidas, pedir uma
            informação e também reclamar, dar sugestões, elogiar.
          </Message>
          <Form onSubmit={() => {}}>
            <FormGroup>
              <h1>Seus dados de contato</h1>
              <FormElements name="nome" label="Nome" placeholder="Nome" />
              <FormElements
                name="sobrenome"
                label="Sobrenome"
                placeholder="Sobrenome"
              />
              <FormElements name="email" label="E-mail" placeholder="E-mail" />
              <FormElements
                name="telefone"
                label="Telefone"
                placeholder="Telefone"
              />
              <FormElements
                name="celular"
                label="Celular"
                placeholder="Celular"
              />
            </FormGroup>

            <FormGroup>
              <h1>Assunto:</h1>
              <FormElements
                name="assunto"
                type="select"
                items={[{ label: 'Selecione o assunto', value: 0 }]}
              />
            </FormGroup>

            <FormGroup>
              <h1>Sua Mensagem</h1>
              <FormElements type="area" name="mensagem" />
            </FormGroup>

            <FormGroupButton>
              <FormElements
                type="checkbox"
                name="politica"
                label={
                  <>Declaro que li e concordo com a {linkPolitics} da Axpe.</>
                }
              />
              <ButtonContainer type="button">Enviar</ButtonContainer>
            </FormGroupButton>
          </Form>
          <BlockHighlighted type="contactWork" />
        </BlockForm>
        <Mapa>
          <iframe
            title="addressAxpe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7407389658424!2d-46.67402236422859!3d-23.57775316878633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57611a6b76ad%3A0x108a9f3f5c35785e!2sAv.%20Nove%20de%20Julho%2C%205017%20-%20Jardim%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001406-200!5e0!3m2!1spt-BR!2sbr!4v1572438069962!5m2!1spt-BR!2sbr"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
          />
        </Mapa>
      </Body>
    </Container>
  );
}

export default Contact;
