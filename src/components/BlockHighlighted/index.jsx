import React from 'react';
import { Container, Highlighted, Link } from './styles';

const ContactHome = () => (
  <>
    <Highlighted type="contactHome">
      <span>Sem tempo </span>
      <strong>
        <span>para buscar e visitar </span>
      </strong>
      <span>imóveis?</span>
    </Highlighted>
    <div>
      <p>
        Conte o que está buscando e vamos encontrar o imóvel dos seus sonhos
      </p>
      <Link color="orange" label="Entre em contato" onClick={() => {}} />
    </div>
  </>
);

const Contact = () => (
  <>
    <Highlighted type="contact">
      <strong>
        <span>Pergunte</span>
      </strong>
      <span>, peça um imóvel ou reclame. Pode elogiar também.</span>
      <hr />
    </Highlighted>
  </>
);

const ContactWork = () => (
  <>
    <Highlighted type="contactWork">
      <span>Gostaria de fazer parte da </span>
      <strong>
        <span>nossa equipe?</span>
      </strong>
    </Highlighted>
    <div>
      <p>
        Nosso ambiente de trabalho é profissional, informal e divertido. Tem
        tudo a ver com você?
      </p>
      <Link color="orange" label="Trabalhe Conosco" href="" />
    </div>
  </>
);

const NotFound = () => (
  <>
    <Highlighted type="notfound">
      <strong>
        <span>Não encontrou o </span>
      </strong>
      <span>imóvel </span>
      <span>que busca?</span>w
    </Highlighted>
    <div>
      <p>
        Que tal um imóvel na planta? Conheça nossas opções de imóveis em
        lançamento
      </p>
      <Link color="orange" label="Entre em contato" onClick={() => {}} />
    </div>
  </>
);

const Planta = ({ href }) => (
  <>
    <Highlighted type="planta">
      <span>Veja a </span>
      <strong>
        <span>planta </span>
      </strong>
      <span>desse imóvel</span>
    </Highlighted>
    <div>
      <p>E descubra se ela é a ideal para você</p>
      <Link
        color="greenLight"
        label="Veja as plantas"
        href={href}
        isExternal={true}
      />
    </div>
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
    </Container>
  );
}
