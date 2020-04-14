import React, { useEffect } from 'react';
import { Link } from 'helpers/routes';
import GTM from 'helpers/gtm';

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
    <Container>
      <Wrapper>
        <p>Foi! Agora é com a gente.</p>
        <p>Em breve, entraremos em contato.</p>

        <Link route="/" passHref>
          <Button>
            &lt; Voltar à home
          </Button>
        </Link>
      </Wrapper>
    </Container>
  )
}

export default DreamBuildingSuccess;
