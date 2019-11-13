import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container } from 'pages/About/ArticleSecurity/styles';
import ISecSecurity from './sec-security.jpg';

export default function ArticleSecurity() {
  return (
    <Container id="seguranca">
      <header>
        <TitleSection>
          <span>Segurança pessoal: </span>
          também nos preocupamos com isso
        </TitleSection>
      </header>
      <img src={ISecSecurity} alt="Imagem de sala" />
      <p>
        Você sabe, infelizmente vivemos em uma cidade com problemas de
        segurança.
      </p>
      <p>
        Por isso, a Axpe dobra e redobra os cuidados com a segurança dos
        clientes e corretores e busca saber com quem está falando, verificando
        os dados de todos que nos procuram.
      </p>
      <p>
        Quando falamos que nosso atendimento é cuidadoso, não é força de expressão.
      </p>
    </Container>
  );
}
