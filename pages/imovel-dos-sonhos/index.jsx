import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// helpers
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
} from 'pages/DreamBuilding/styles';

function DreamBuilding() {
  return (
    <>
      <Head>
        <title>{`Imóvel dos sonhos - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        <Wrapper>
          <Header>
            <h2>Conte como é o imóvel <strong>dos seus sonhos</strong></h2>
            <p>Qual o perfil do imóvel que você deseja?</p>
          </Header>
          <List>
            <li>
              <Link href="/imovel-dos-sonhos/sao-paulo-comprar" passHref>
                <ListButton>
                  <ListText>
                    <h3>São Paulo - Comprar</h3>
                    <p>Prontos para morar</p>
                  </ListText>
                  <ListImage src="/static/dream-building/sao-paulo-comprar.jpg" alt="São Paulo - Comprar" />
                </ListButton>
              </Link>
            </li>
            <li>
              <Link href="/imovel-dos-sonhos/sao-paulo-lancamentos" passHref>
                <ListButton>
                  <ListText>
                    <h3>São Paulo - Lançamentos</h3>
                    <p>Imóveis residenciais</p>
                  </ListText>
                  <ListImage src="/static/dream-building/sao-paulo-lancamentos.jpg" alt="São Paulo - Lançamentos" />
                </ListButton>
              </Link>
            </li>
            <li>
              <Link href="/imovel-dos-sonhos/sao-paulo-alugar" passHref>
                <ListButton>
                  <ListText>
                    <h3>São Paulo - Alugar</h3>
                    <p>Prontos para morar</p>
                  </ListText>
                  <ListImage src="/static/dream-building/sao-paulo-alugar.jpg" alt="São Paulo - Alugar" />
                </ListButton>
              </Link>
            </li>
            <li>
              <Link href="/imovel-dos-sonhos/sao-paulo-comerciais" passHref>
                <ListButton>
                  <ListText>
                    <h3>São Paulo - Comerciais</h3>
                    <p>Alugar ou Comprar</p>
                  </ListText>
                  <ListImage src="/static/dream-building/sao-paulo-comerciais.jpg" alt="São Paulo - Comerciais" />
                </ListButton>
              </Link>
            </li>
            <li>
              <Link href="/imovel-dos-sonhos/praia-campo" passHref>
                <ListButton>
                  <ListText>
                    <h3>Praia e Campo</h3>
                    <p>Alugar ou Comprar</p>
                  </ListText>
                  <ListImage src="/static/dream-building/praia-campo.jpg" alt="Praia e Campo" />
                </ListButton>
              </Link>
            </li>
            <li>
              <Link href="/imovel-dos-sonhos/internacional" passHref>
                <ListButton>
                  <ListText>
                    <h3>Internacional</h3>
                    <p>Alugar ou morar</p>
                  </ListText>
                  <ListImage src="/static/dream-building/internacional.jpg" alt="Internacional" />
                </ListButton>
              </Link>
            </li>
          </List>
        </Wrapper>
      </Container>
    </>
  );
}

export default DreamBuilding;
