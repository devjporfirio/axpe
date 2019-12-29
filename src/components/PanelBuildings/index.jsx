import React from 'react';

// components
import SlickSection from 'components/SlickSection';

// styles
import { Container, Header, Title, SubTitle } from './styles';

export default function PanelBuildings({ className, children, items = [], title, subTitle, isHome }) {
  return (
    <Container className={className} hasSubtitle={!!subTitle} isHome={isHome}>

      <Header>
        <Title dangerouslySetInnerHTML={{ __html: title }} />
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </Header>

      {items.length ? (
        <SlickSection
          type="slickSmall"
          items={items}
        />
      ) : children}

    </Container>
  );
}
