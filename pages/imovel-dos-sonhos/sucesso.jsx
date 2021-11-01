import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// helpers
import { Link } from 'helpers/routes';
import GTM from 'helpers/gtm';
import SeoData from 'helpers/seo';

// styles
import { Container, Wrapper, Button } from 'pages/DreamBuilding/Success/styles';

function DreamBuildingSuccess() {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    function Asc(str) {
      return str.charCodeAt(0);
    }

    function Chr(asciiNum) {
      return String.fromCharCode(asciiNum);
    }

    function encriptData(data) {
      let result = '';
      let l;
      let j = 0;
      const hash = 'assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm';

      for (let i = 0; i < data.length; i++) {
        j++;
        l = Asc(data.substr(i, 1)) + Asc(hash.substr(j, 1));

        if (j == 50) {
          j = 1;
        }

        if (l > 255) {
          l -= 256;
        }

        result += Chr(l);
      }

      return result;
    }

    let encriptedEmail = null;

    if (query.email) {
      encriptedEmail = encriptData(query.email);
    }

    if (localStorage) {
      localStorage.setItem('cryptoId', encriptedEmail);
    }

    GTM.dataLayerPush({
      event: 'Form Response',
      formType: 'Imóvel dos Sonhos',
      formResult: 'Sucesso',
      formMessage: '',
      cryptoId: encriptedEmail,
    });
  }, []);

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
            <Button>&lt; Voltar à home</Button>
          </Link>
        </Wrapper>
      </Container>
    </>
  );
}

export default DreamBuildingSuccess;
