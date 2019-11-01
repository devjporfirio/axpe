import React from 'react';
import { Container, Highlighted, Link } from './styles';

const Contact = () => (
  <>
    <Highlighted type="contact">
      <span>Sem tempo </span>
      <span>para buscar e visitar </span>
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

const NotFound = () => (
  <>
    <Highlighted type="notfound">
      <span>Não encontrou o </span>
      <span>imóvel </span>
      <span>que busca?</span>
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
      <span>planta </span>
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

export default function BlockHighlighted ({ type, href }) {
  return (
    <Container>
      {type === 'contact' && <Contact />}
      {type === 'notfound' && <NotFound />}
      {type === 'planta' && <Planta href={href} />}
    </Container>
  );
}
