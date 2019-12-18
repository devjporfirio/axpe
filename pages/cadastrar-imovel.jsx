import React from 'react';
import Link from 'next/link';

// components
import BlockHighlighted from 'components/BlockHighlighted';
import Contact from 'components/Contact';

// styles
import { Container, List, Item, Gradient } from 'pages/RegisterProperty/styles';

const PROPERTY_TYPES = [
  { to: 'Residencial', label: 'Residencial em São Paulo' },
  { to: 'Comercial', label: 'Comercial em São Paulo' },
  { to: 'Praia', label: 'Praia' },
  { to: 'Campo', label: 'Campo' },
  { to: 'Internacional', label: 'Internacional' }
];

function RegisterProperty() {
  return (
    <Container>
      <BlockHighlighted type="registerPropertyWhite" />

      <List>
        {PROPERTY_TYPES.map(type => (
          <Link key={type.to} href={`/cadastrar-imovel-form?param=${type.to}`}>
            <Item background={type.to}>
              <Gradient />
              <p>{type.label}</p>
            </Item>
          </Link>
        ))}
      </List>

      <BlockHighlighted type="registerPropertyTransform" />
      <Contact />
    </Container>
  );
}

export default RegisterProperty;
