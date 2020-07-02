import React, { useEffect } from 'react';
import Head from 'next/head';

// helpers
import { Link } from 'helpers/routes';
import GTM from 'helpers/gtm';
import SeoData from 'helpers/seo';

// styles
import {
  Container,
  Wrapper,
  Button
} from 'pages/DreamBuilding/Success/styles'

function DreamBuildingSuccess() {
  useEffect(() => {
    GTM.dataLayerPush({
      event: 'Form Response',
      formType: 'Imóvel dos Sonhos',
      formResult: 'Sucesso',
      formMessage: '',
    })
  }, [ ]);

  return (
    <>
    <Head>
      <title>{`Imóvel dos sonhos - ${SeoData.title}`}</title>
      <meta name="description" content={SeoData.description} />
    </Head>
    <Container>
      <Wrapper>
        <h2>Foi! Agora é com a gente.</h2>
        <p>Em breve, entraremos em contato.</p>

        <Link route="/" passHref>
          <Button>
            &lt; Voltar à home
          </Button>
        </Link>
      </Wrapper>
    </Container>
    </>
  )
}

export default DreamBuildingSuccess;
