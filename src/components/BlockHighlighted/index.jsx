import React from 'react';
import { Container, HighlightedH1, HighlightedH4, Link } from './styles';

const ContactHome = () => (
  <>
    <HighlightedH4 type="contactHome">
      <span>Sem tempo </span>
      <strong>
        <span>para buscar e visitar </span>
      </strong>
      <span>imóveis?</span>
    </HighlightedH4>
    <div>
      <p>
        Conte o que está buscando e vamos encontrar o imóvel dos seus sonhos
      </p>
      <Link fullWidth={true} type="button" onClick={() => {}}>
        Entre em contato
      </Link>
    </div>
  </>
);

const Contact = () => (
  <>
    <HighlightedH1 type="contact">
      <strong>
        <span>Pergunte</span>
      </strong>
      <span>, peça um imóvel ou reclame. Pode elogiar também.</span>
      <hr />
    </HighlightedH1>
  </>
);

const ContactWork = () => (
  <>
    <HighlightedH4 type="contactWork">
      <span>Gostaria de fazer parte da </span>
      <strong>
        <span>nossa equipe?</span>
      </strong>
    </HighlightedH4>
    <div>
      <p>
        Nosso ambiente de trabalho é profissional, informal e divertido. Tem
        tudo a ver com você?
      </p>
      <Link href="/trabalhe-conosco">Trabalhe Conosco</Link>
    </div>
  </>
);

const NotFound = () => (
  <>
    <HighlightedH4 type="notfound">
      <strong>
        <span>Não encontrou o </span>
      </strong>
      <span>imóvel </span>
      <span>que busca?</span>
    </HighlightedH4>
    <div>
      <p>
        Que tal um imóvel na planta? Conheça nossas opções de imóveis em
        lançamento
      </p>
      <Link fullWidth={true} type="button" onClick={() => {}}>
        Entre em contato
      </Link>
    </div>
  </>
);

const Planta = ({ href }) => (
  <>
    <HighlightedH4 type="planta">
      <span>Veja a </span>
      <strong>
        <span>planta </span>
      </strong>
      <span>desse imóvel</span>
    </HighlightedH4>
    <div>
      <p>E descubra se ela é a ideal para você</p>
      <Link href={href} color="greenLight" target="_blank">
        Veja as plantas
      </Link>
    </div>
  </>
);

const Landing = () => (
  <>
    <HighlightedH4 type="landing">
      <span>Por que não um </span>
      <span>imóvel </span>
      <strong>
        <span>novo? </span>
      </strong>
    </HighlightedH4>
    <div>
      <p>
        Na AxPe, você econtra aquele imóvel lindo onde cabem todos os sonhos.{' '}
        <br />
        Onde pode construir um refúgio, uma vida. Mas isso é só o começo.
      </p>
      <Link href="/contato" target="_blank">
        Entre em contato
      </Link>
    </div>
  </>
);

const RegisterProperty = () => (
  <>
    <HighlightedH1 type="registerProperty">
      <strong>
        <span>Cadastre seu imóvel.</span>
      </strong>
      <br />
      <span> Com certeza tem alguém procurando por ele</span>
      <hr />
    </HighlightedH1>
  </>
);

const RegisterPropertyTransform = () => (
  <>
    <HighlightedH1 type="registerPropertyTransform">
      <span>Transforme seu sonho em </span>
      <strong>
        <span>realidade</span>
      </strong>
    </HighlightedH1>
    <div>
      <p>
        Conte para a gente como é o imóvel dos seus sonho e valos encontrá-lo
        para você
      </p>
      <Link href="/contato">Fale Conosco</Link>
    </div>
  </>
);

const RegisterPropertyWhite = () => (
  <>
    <HighlightedH1 type="registerPropertyWhite">
      <span>
        Cadastre <strong>seu imóvel</strong>
      </span>
      <br />
      <span> Com certeza tem alguém procurando por ele</span>
    </HighlightedH1>
  </>
);

export default function BlockHighlighted({ type, href }) {
  return (
    <Container type={type}>
      {type === 'contactHome' && <ContactHome />}
      {type === 'contact' && <Contact />}
      {type === 'notfound' && <NotFound />}
      {type === 'planta' && <Planta href={href} />}
      {type === 'contactWork' && <ContactWork />}
      {type === 'landing' && <Landing />}
      {type === 'registerProperty' && <RegisterProperty />}
      {type === 'registerPropertyWhite' && <RegisterPropertyWhite />}
      {type === 'registerPropertyTransform' && <RegisterPropertyTransform />}
    </Container>
  );
}
