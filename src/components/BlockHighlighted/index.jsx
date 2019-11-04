import React from 'react';
import { Container, Highlighted, Link } from './styles';

const ContactHome = () => (
  <>
    <Highlighted type="contactHome">
      <h4>Sem tempo </h4>
      <h4>para buscar e visitar </h4>
      <h4>imóveis?</h4>
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
      <h4>Pergunte, </h4>
      <h4>peça um imóvel ou reclame. Pode elogiar também.</h4>
    </Highlighted>
  </>
);

const NotFound = () => (
  <>
    <Highlighted type="notfound">
      <h4>Não encontrou o </h4>
      <h4>imóvel </h4>
      <h4>que busca?</h4>
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
      <h4>Veja a </h4>
      <h4>planta </h4>
      <h4>desse imóvel</h4>
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
    </Container>
  );
}
