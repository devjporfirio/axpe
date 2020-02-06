import React, { useState } from 'react';
import SVG from 'react-inlinesvg';

// styles
import {
  Button,
  ButtonClose,
  ListContacts
} from './styles';

// assets
import WhatsappIconSVG from 'assets/icons/whats-white-trans';
import MailIconSVG from 'assets/icons/mail-white-trans';
import PhoneIconSVG from 'assets/icons/phone-white-trans';
import ChatIconSVG from 'assets/icons/chat-white-trans';

function ContactFloat() {
  const [ showContact, setShowContact ] = useState(false);

  return (
    <>
      <Button active={!showContact} onClick={() => setShowContact(!showContact)}>Fale conosco</Button>
      <ListContacts active={showContact}>
        <ButtonClose onClick={() => setShowContact(!showContact)} />
        <a href="https://api.whatsapp.com/send?phone=5511999998888" target="_blank">
          <SVG src={WhatsappIconSVG} />
          <p className="mobile">Whatsapp</p>
          <p className="desktop">
            Nosso Whatsapp <br />
            (11) 99999-8888
          </p>
        </a>
        <a href="mailto:axpe@contato.com.br">
          <SVG src={MailIconSVG} />
          <p className="mobile">E-mail</p>
          <p className="desktop">
            Mande um email: <br />
            axpe@contato.com.br
          </p>
        </a>
        <a href="tel:+5511999998889">
          <SVG src={PhoneIconSVG} />
          <p className="mobile">Telefone</p>
          <p className="desktop">
            Nos ligue:
            <br /> (11) 99999-8889
          </p>
        </a>
        <a href="/chat">
          <SVG src={ChatIconSVG} />
          <p className="mobile">Chat</p>
          <p className="desktop">
            Também atendemos <br />
            pelo nosso chat
          </p>
        </a>
      </ListContacts>
    </>
  );
}

export default ContactFloat;