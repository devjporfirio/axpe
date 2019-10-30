import React, { Fragment } from 'react'
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
              onClick={() =>
                window.open(
                  component.link.url,
                  item.link.external ? '_blank' : '_self'
                )
              }
              mq="mobile"
              src={component.images.mobile}
            />
            <Banner
              onClick={() =>
                window.open(
                  component.link.url,
                  item.link.external ? '_blank' : '_self'
                )
              }
              mq="desktop"
              src={component.images.desktop}
            />
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
        return (
          <BlockHighlighted
            texts={[
              {
                text: 'Sem tempo ',
                color: 'greenLight',
                fontFamily: 'Raleway',
                fontWeight: '500'
              },
              {
                text: 'para buscar e visitar  ',
                color: 'white',
                fontFamily: 'BitterBold',
                fontWeight: '700'
              },
              {
                text: 'imóveis?',
                color: 'orange',
                fontFamily: 'Raleway',
                fontWeight: '500'
              }
            ]}
            colorButton="orange"
            message="Conte o que está buscando e vamos encontrar o imóvel dos seus sonhos"
            labelButton="Entre em contato"
            onClickButton={() => {}}
          />
        );
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
