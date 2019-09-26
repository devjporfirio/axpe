import React from 'react';

import { Container, Title, SubTitle } from './styles';

export default function PanelBuildings({ id, children, title, subTitle }) {
  return (
    <Container id={id}>
      <header>
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </header>
      {children}
    </Container>
  );
}
