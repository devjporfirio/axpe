import React, { useState } from 'react';
import SVG from 'react-inlinesvg';

import { Button, ButtonClose, ListContacts } from './styles';

import Whats from 'assets/icons/whats-white-trans';
import Mail from 'assets/icons/mail-white-trans';
import Phone from 'assets/icons/phone-white-trans';
import Chat from 'assets/icons/chat-white-trans';

export default function ContactFloat() {
  const [ showContact, setShowContact ] = useState(false);
  return !showContact ? (
    <Button onClick={() => setShowContact(!showContact)}>FALE CONOSCO</Button>
  ) : (
    <ListContacts>
      <ButtonClose onClick={() => setShowContact(!showContact)} />
      <a href="https://api.whatsapp.com/send?phone=5511999998888" target="_blank">
        <SVG src={Whats} />
        <p className="mobile">Whatsapp</p>
        <p className="desktop">
          Nosso Whatsapp <br />
          (11) 99999-8888
        </p>
      </a>
      <a href="mailto:axpe@contato.com.br">
        <SVG src={Mail} />
        <p className="mobile">E-mail</p>
        <p className="desktop">
          Mande um email: <br />
          axpe@contato.com.br
        </p>
      </a>
      <a href="tel:+5511999998889">
        <SVG src={Phone} />
        <p className="mobile">Telefone</p>
        <p className="desktop">
          Nos ligue:
          <br /> (11) 99999-8889
        </p>
      </a>
      <a href="/chat">
        <SVG src={Chat} />
        <p className="mobile">Chat</p>
        <p className="desktop">
          Também atendemos <br />
          pelo nosso chat
        </p>
      </a>
    </ListContacts>
  );
}
