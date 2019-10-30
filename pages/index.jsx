import React, { Fragment } from 'react';
import Api from 'services';
import SlickSection from 'components/SlickSection';
import PanelBuildings from 'components/PanelBuildings';
import BlockHighlighted from 'components/BlockHighlighted';
import Contact from 'components/Contact';
import { suffle } from 'helpers/utils';

const COMPONENT_SLICK = {
  buildingsSquare: 'slickLeft',
  buildingsGrid: 'slickGrid',
  buildingsSeen: 'slickLarge',
  buildingsForYou: 'slickSmall'
};

import { Container, Banner } from 'pages/Home/styles';

function Home({ hero, components }) {
  function renderComponents(type, component) {
    switch (type) {
      case 'banner':
        return (
          <>
            <Banner
              href={component.link.url}
              target={component.link.external ? '_blank' : '_self'}
              mq="mobile"
            >
              <img src={component.images.mobile} alt="" />
            </Banner>
            <Banner
              href={component.link.url}
              target={component.link.external ? '_blank' : '_self'}
              mq="desktop"
            >
              <img src={component.images.mobile} alt="" />
            </Banner>
            <br />
            <br />
          </>
        );
      case 'buildingsSquare':
      case 'buildingsGrid':
      case 'buildingsSeen':
      case 'buildingsForYou':
        if ([ 'buildingsSquare', 'buildingsGrid' ].includes(type)) {
          component.items = suffle(component.items);
        }

        return (
          component.items &&
          component.items.length > 0 && (
            <>
              <SlickSection
                type={COMPONENT_SLICK[type]}
                items={component.items}
              />
            </>
          )
        );
      case 'contact':
        return <BlockHighlighted type="contact" />;
    }
  }

  return (
    <Container>
      <SlickSection useGradient={true} color="white" items={hero} />

      {components &&
        components.length > 0 &&
        components.map(c => {
          if (c.type === 'buildingsSeen') {
            return (
              c.items &&
              c.items.length > 0 && (
                <PanelBuildings
                  key={c.type}
                  className={c.type}
                  title="Imóveis que você viu"
                >
                  {renderComponents(c.type, c)}
                </PanelBuildings>
              )
            );
          } else if (c.type === 'buildingsForYou') {
            return (
              c.items &&
              c.items.length > 0 && (
                <PanelBuildings
                  key={c.type}
                  className={c.type}
                  title="Indicados para você"
                  subTitle="Selecionamos alguns imóveis que acabaram de chegar"
                >
                  {renderComponents(c.type, c)}
                </PanelBuildings>
              )
            );
          }
          return (
            <Fragment key={c.type}>{renderComponents(c.type, c)}</Fragment>
          );
        })}

      <Contact />
    </Container>
  );
};

Home.getInitialProps = async() => {
  const response = await Api.Home.getPage();
  return { hero: response.hero, components: response.components }
}

export default Home;
