import React from 'react';

// components
import Modal from 'components/Modals';
import Slider from 'components/Slider';
import Button from 'components/Button';

// styles
import { Texts, Text, TextWrapper, Column, ColumnTitle } from 'components/Modals/styles';
import { LoginContainer, LoginRow, LoginForm } from './styles';

function LoginModal() {
  return (
    <Modal>
      <Texts>
        <Slider propsArrow={{ color: 'white' }}>
          <Text>
            <TextWrapper>
              <h2 className="big">Uma <strong>Axpe</strong> <span>só sua</span></h2>
              <p>Leva só 10 segundos: personalize sua navegação salvando seus imóveis favoritos, criando alertas e recebendo notícias de móveis com seu perfil.<br/> É só fazer seu login.</p>
            </TextWrapper>
          </Text>
          <Text>
            <TextWrapper>
              <h2>Todos os dias chegam <strong>novos imóveis</strong>. Seja o primeiro a saber.</h2>
              <p>Faça seu login e receba um alerta sempre que chegar um imóvel com seu perfil</p>
            </TextWrapper>
          </Text>
        </Slider>
      </Texts>
      <Column>
        <LoginContainer>
          <LoginRow>
            <ColumnTitle>Já tem um cadastro? <span>Faça seu login.</span></ColumnTitle>
            <LoginForm></LoginForm>
          </LoginRow>
          <LoginRow>
            <ColumnTitle>É sua primeira visita?</ColumnTitle>
            <Button href="cadastrar" as="cadastrar" fullWidth={true}>Cadastre</Button>
          </LoginRow>
        </LoginContainer>
      </Column>
    </Modal>
  )
}

export default LoginModal
