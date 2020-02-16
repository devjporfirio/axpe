import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container } from 'pages/About/ArticleSecurity/styles';

export default function ArticleSecurity() {
  return (
    <Container id="seguranca">
      <header>
        <TitleSection>
          <strong>Segurança pessoal: </strong><br/>
          também nos preocupamos com isso
        </TitleSection>
      </header>
      <img src="static/about/sec-security.jpg"  alt="Imagem de sala" />
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
