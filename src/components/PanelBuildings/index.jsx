import React from 'react';

import { Container, Title, SubTitle } from './styles';

export default function PanelBuildings ({ className, children, title, subTitle }) {
  return (
    <Container className={className} hasSubtitle={!!subTitle}>
      <header>
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </header>
      {children}
    </Container>
  );
}
