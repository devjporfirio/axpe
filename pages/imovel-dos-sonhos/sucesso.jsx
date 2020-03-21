import React from 'react';
import Link from 'next/link';

// styles
import {
  Container,
  Wrapper,
  Button
} from 'pages/DreamBuilding/Success/styles'

function DreamBuildingSuccess() {
  return (
    <Container>
      <Wrapper>
        <h2>”Um sonho sonhado sozinho é um sonho. <strong>Um sonho sonhado junto é realidade”</strong><span>(Yoko Ono)</span></h2>
        <p>Seu sonho já foi enviado. Agora é conosco.</p>
        <p>Em breve, entraremos em contato.</p>

        <Link href="/">
          <Button>
            &lt; Voltar à home
          </Button>
        </Link>
      </Wrapper>
    </Container>
  )
}

export default DreamBuildingSuccess;
