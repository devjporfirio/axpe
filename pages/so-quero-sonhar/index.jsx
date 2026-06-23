import React, { useState, useEffect } from 'react';
import Head from 'next/head';

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const BASE_URL = API_URL.replace('/api', '');

  useEffect(() => {
    async function loadDreams() {
      try {
        const response = await fetch(`${API_URL}/so-quero-sonhar`);
        const result = await response.json();

        if (result.success) {
          setData(result.data.reverse());
        }
      } catch (error) {
        console.error('Erro ao carregar Só Quero Sonhar:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDreams();
  }, [API_URL]);

  if (loading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{`So quero sonhar - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>

      <Container>
        <Wrapper>
          <Header>
            <h2>
              Só Quero <strong>Sonhar</strong>
            </h2>

            <p>
              Espaços para você sonhar junto com a gente pois nem toda busca
              começa por uma necessidade. Algumas começam por um desejo difícil
              de explicar. Arquitetura, natureza, história, personalidade.
              Escolha o que faz sentido para você e deixe a descoberta
              acontecer.
            </p>
          </Header>

          <List>
            {data.map((item) => (
              <li
                id={`block-category-${item.id}`}
                key={`dream-list-item-${item.id}`}
              >
                <Link href={`/so-quero-sonhar${item.link}`} passHref>
                  <ListButton
                    className="holos-search-category-button"
                    data-showcase="Só Quero Sonhar"
                    data-label={item.title}
                  >
                    <ListText>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </ListText>

                    <ListImage
                      src={`${BASE_URL}/uploads/images/so-quero-sonhar/${item.image_url}`}
                      alt={item.title}
                    />
                  </ListButton>
                </Link>
              </li>
            ))}
          </List>
        </Wrapper>

        <BlockHighlighted type="contactHome" />
      </Container>
    </>
  );
}

export default Dream;