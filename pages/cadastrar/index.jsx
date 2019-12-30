import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// helpers
import SeoData from 'helpers/seo';

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
    <>
      <Head>
        <title>{`Cadastre seu imóvel - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        <BlockHighlighted type="registerPropertyWhite" />

        <List>
          {PROPERTY_TYPES.map(type => (
            <Link key={type.to} href={`/cadastrar/${type.to}`}>
              <Item background={type.to.toLowerCase()}>
                <Gradient />
                <p>{type.label}</p>
              </Item>
            </Link>
          ))}
        </List>

        <BlockHighlighted type="registerPropertyTransform" />
        <Contact />
      </Container>
    </>
  );
}

export default RegisterProperty;
