import React, { useState, useEffect } from 'react';
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

      const mock = [
        ...homePage.components[1].items,
        {
          ...homePage.components[1].items[0],
          id: 3,
          title: homePage.components[1].items[0].title + 3
        },
        {
          ...homePage.components[1].items[0],
          id: 4,
          title: homePage.components[1].items[0].title + 4
        }
      ];
      homePage.components[3].items = mock;
      homePage.components[4].items = mock;

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
            <br/>
            <br/>
          </>
        );
      case 'buildingsSquare':
      case 'buildingsGrid':
      case 'buildingsSeen':
      case 'buildingsForYou':
        return (
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
              <PanelBuildings className={c.type} title="Imóveis que você viu">
                {renderComponents(c.type, c)}
              </PanelBuildings>
            );
          } else if (c.type === 'buildingsForYou') {
            return (
              <PanelBuildings className={c.type}
                title="Indicados para você"
                subTitle="Selecionamos alguns imóveis que acabaram de chegar"
              >
                {renderComponents(c.type, c)}
              </PanelBuildings>
            );
          }
          return renderComponents(c.type, c);
        })}
    </Container>
  );
}