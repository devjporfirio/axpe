import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// data
import DataJSON from 'pages/Dream/data.json';

// helpers
import SeoData from 'helpers/seo';

// components
import BlockHighlighted from 'components/BlockHighlighted';

// styles
import { Container, Header, List, MainListLink } from 'pages/Dream/styles';

function Dream() {
  const [ data, setData ] = useState(null);

  useEffect(() => {
    setData(DataJSON.data);
  }, [])

  return (
    <>
      <Head>
        <title>{`So quero sonhar - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      {data ? (
        <Container>
          <Header>
            <h1>Só Quero <span>Sonhar</span></h1>
            <p>Espaços para você sonhar junto com a gente. Dê uma olhada na nossa seleção de imóveis.</p>
            <p>Sempre temos um perfeito para o seu estilo e momento de vida.</p>
          </Header>

          <main>
            <List>
              {data.map((item, itemIndex) => (
                <li key={`dream-list-item-${itemIndex}`} style={{ backgroundImage: `url(/static/dream/cover-${item.slug}.jpg)` }}>
                  <Link  href={`/so-quero-sonhar/[slug]`} as={`/so-quero-sonhar/${item.slug}`} passHref>
                    <MainListLink>
                      <h2>{item.title}</h2>
                      <p>{item.subtitle}</p>
                    </MainListLink>
                  </Link>
                </li>
              ))}
            </List>
          </main>

          <BlockHighlighted type="dream" />
        </Container>
      ) : null}
    </>
  );
}

export default Dream;
