import React from 'react';
import BlockHighlighted from 'components/BlockHighlighted';
import FormElements from 'components/FormElements';
import GoogleMapReact from 'google-map-react';
import { useFormik } from 'formik';
import Api from 'services';

import { FormGroup } from 'components/FormElements/styles';
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
  FormGroupButton,
  Mapa,
  Balloon,
  Pin,
  Circle,
  Rec
} from 'pages/Contact/styles';

function Contact() {
  const linkPolitics = <a href="/politica">política de privacidade</a>;

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      mobile: '',
      subject: '',
      message: '',
      terms: false
    },
    onSubmit: async values => {
      if (!values.terms) {
        alert('Aceite os termos :D');
        return;
      }
      const resp = await Api.Contact.postContact(values);
      if (resp.status === 'success') {
        alert(resp.status);
      }
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
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <h1>Seus dados de contato</h1>
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
                type="email"
                name="email"
                label="E-mail"
                placeholder="E-mail"
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
            </FormGroup>

            <FormGroup>
              <h1>Assunto:</h1>
              <FormElements
                name="subject"
                type="select"
                items={[
                  { label: 'Selecione o assunto', value: '' },
                  { label: 'Compra', value: 'compra' },
                  { label: 'Venda', value: 'venda' }
                ]}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <h1>Sua Mensagem</h1>
              <FormElements
                type="area"
                name="message"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroupButton>
              <FormElements
                type="checkboxLink"
                name="terms"
                label={
                  <>Declaro que li e concordo com a {linkPolitics} da Axpe.</>
                }
                onChange={handleChange}
              />
              <ButtonContainer type="submit">Enviar</ButtonContainer>
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
