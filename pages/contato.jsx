import React from 'react';
import TextCustom from 'components/TextCustom';
import Button from 'components/Button';
import BlockHighlighted from 'components/BlockHighlighted';
import * as Input from 'components/FormElements';

import {
  Container,
  Header,
  Numbers,
  PhoneNumber,
  Tel,
  Whats,
  Form,
  Mapa,
  SubText
} from 'pages/Contact/styles';

function Contact() {
  return (
    <Container>
      <Header>
        <BlockHighlighted type="contact" />
        <hr />
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
      <Form>
        <p>
          Esse é sua linha direta para falar com a gente sobre qualquer assunto.
          Pedir um imóvel bem específico, tirar dúvidas, pedir uma informação e
          também reclamar, dar sugestões, elogiar.
        </p>

        <h2>Seus dados de contato</h2>
        <Input.Text placeholder="Nome" />
        <Input.Text placeholder="Sobrenome" />
        <Input.Email placeholder="E-mail" />
        <Input.Phone placeholder="Telefone" />
        <Input.Phone placeholder="Celular" />

        <h2>Assunto:</h2>
        <Input.Select items={[{ label: 'Selecione o assunto', value: 0 }]} />
        <Input.Select items={[{ label: 'Selecione o assunto', value: 0 }]} />

        <h2>Sua Mensagem</h2>
        <Input.Area />

        <Input.Checkbox
          label="Declaro que li e concordo com a política de privacidade da Axpe."
        />

        <Button label="Enviar" />
      </Form>
      <Header>
        <TextCustom color="white" fontFamily="Bitter">
          Gostaria de fazer parte da{' '}
        </TextCustom>
        <TextCustom color="orange" fontFamily="Raleway" fontWeight="500">
          nossa equipe?
        </TextCustom>
        <SubText>
          Nosso ambiente de trabalho é profissional, informal e divertido. Tem
          tudo a ver com você?
        </SubText>
        <Button label="Trabalhe Conosco" />
      </Header>
      {/* -46.67402236422859!3d-23.57775316878633 */}
      <Mapa>
        MAPA AQUI
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7407389658424!2d-46.67402236422859!3d-23.57775316878633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57611a6b76ad%3A0x108a9f3f5c35785e!2sAv.%20Nove%20de%20Julho%2C%205017%20-%20Jardim%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001406-200!5e0!3m2!1spt-BR!2sbr!4v1572438069962!5m2!1spt-BR!2sbr"
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
        /> */}
      </Mapa>
    </Container>
  );
}

export default Contact;