import React, { useState, useEffect } from 'react';
import Head from 'next/head';

// data
import DataJSON from 'pages/Dream/data.json';

// components
import BlockHighlighted from 'components/BlockHighlighted';

// helpers
import Link from 'next/link';
import SeoData from 'helpers/seo';

// styles
import {
  Container,
  Wrapper,
  Header,
  List,
  ListButton,
  ListText,
  ListImage
} from 'pages/Dream/styles';

function Dream() {
  const [ data, setData ] = useState(null);

  useEffect(() => {
    setData(DataJSON.data);
  }, []);

  return (
    <>
      <Head>
        <title>{`So quero sonhar - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      {data ? (
        <Container>
          <Wrapper>
            <Header>
              <h2>Só Quero <strong>Sonhar</strong></h2>
              <p>Espaços para você sonhar junto com a gente pois nem toda busca começa por uma necessidade. Algumas começam por um desejo difícil de explicar. Arquitetura, natureza, história, personalidade. Escolha o que faz sentido para você e deixe a descoberta acontecer. </p>
            </Header>
            <List>
              {data.map((item, itemIndex) => (
                <li id={`block-category-${item.slug}`} key={`dream-list-item-${itemIndex}`}>
                  <Link href={`/so-quero-sonhar/${item.url}`} passHref>
                    <ListButton
                      className="holos-search-category-button"
                      data-showcase="Só Quero Sonhar"
                      data-label={item.title}
                    >
                      <ListText>
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
                      </ListText>
                      <ListImage src={`/static/dream/cover-${item.slug}.jpg`} alt={item.title} />
                    </ListButton>
                  </Link>
                </li>
              ))}
            </List>
          </Wrapper>

          <BlockHighlighted type="contactHome" />
        </Container>
      ) : null}
    </>
  );
}

export default Dream;
