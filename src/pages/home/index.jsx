import React, { useState, useEffect, Fragment } from 'react';
import { Container, Banner } from './styles';
import Api from 'services/';
import Slick from 'components/Slick';
import PanelBuildings from 'components/PanelBuildings';
import Footer from 'components/Footer';

const COMPONENT_SLICK = {
  buildingsSquare: 'slickLeft',
  buildingsGrid: 'slickGrid',
  buildingsSeen: 'slickLarge',
  buildingsForYou: 'slickSmall'
};

export default function Home() {
  const [ hero, setHero ] = useState([]);
  const [ components, setComponents ] = useState([]);

  useEffect(() => {
    async function loadHome() {
      const homePage = await Api.home.loadHome();
      setHero(homePage.hero);
      setComponents(homePage.components);
    }
    loadHome();
  }, []);

  function renderComponents(type, component) {
    switch (type) {
      case 'banner':
        return (
          <>
            <Banner mq="mobile" src={component.images.mobile} />
            <Banner mq="desktop" src={component.images.desktop} />
            <br />
            <br />
          </>
        );
      case 'buildingsSquare':
      case 'buildingsGrid':
      case 'buildingsSeen':
      case 'buildingsForYou':
        return (
          component.items &&
          component.items.length > 0 && (
            <>
              <Slick type={COMPONENT_SLICK[type]} items={component.items} />
            </>
          )
        );
      case 'contact':
        return <Footer />;
    }
  }

  return (
    <Container>
      <Slick items={hero} />

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
    </Container>
  );
}
