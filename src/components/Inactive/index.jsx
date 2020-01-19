import React from 'react';
import SVG from 'react-inlinesvg';

// styles
import { Container } from './styles';

// images
import IEmoji from 'assets/icons/emoji';

export default function Inactive({ type, className }) {
  return (
    <Container type={type} className={className}>
      <SVG src={IEmoji} />
      <p>
        <strong>Ops!</strong>
        <br />
        Esse imóvel não está mais disponível
      </p>
    </Container>
  );
}
