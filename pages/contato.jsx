import React from 'react';
import BlockHighlighted from 'components/BlockHighlighted';
import FormElements from 'components/FormElements';
import GoogleMapReact from 'google-map-react';
import { useFormik } from 'formik';

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
  Mapa,
  Balloon,
  Pin,
  Circle,
  Rec
} from 'pages/Contact/styles';

function Contact() {
  const linkPolitics = <a href="/politica">política de privacidade</a>;

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      phone: '',
      mobile: '',
      subject: '',
      message: ''
    },

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

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
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <h1>Seus dados de contato</h1>
              <FormElements
                name="nome"
                label="Nome"
                placeholder="Nome"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <FormElements
                name="sobrenome"
                label="Sobrenome"
                placeholder="Sobrenome"
              />
              <FormElements
                type="email"
                name="email"
                label="E-mail"
                placeholder="E-mail"
              />
              <FormElements
                type="phone"
                name="telefone"
                label="Telefone"
                placeholder="Telefone"
              />
              <FormElements
                type="phone"
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
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyAn4jhPJpyJwgIYnYyr4Kaj1JSyg74Qoto'
            }}
            defaultCenter={{
              lat: -23.577706,
              lng: -46.673809
            }}
            defaultZoom={12}
          >
            <Pin lat={-23.577706} lng={-46.673809}>
              <Balloon>
                <div></div>
                <h4>Nosso escritório</h4>
                <p>
                  Avenida Nove de Julho, 5017, 10° Andar. Jardim Paulista - São
                  Paulo, SP
                </p>
                <a href="https://g.page/axpe_imoveis?share">Como chegar?</a>
              </Balloon>
              <Rec></Rec>
              <Circle></Circle>
            </Pin>
          </GoogleMapReact>
        </Mapa>
      </Body>
    </Container>
  );
}

export default Contact;
