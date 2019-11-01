import React, { Fragment, useEffect, useState } from 'react';
import Api from 'services';
import SlickSection from 'components/SlickSection';
import PanelBuildings from 'components/PanelBuildings';
import BlockHighlighted from 'components/BlockHighlighted';
import Contact from 'components/Contact';
import { suffle } from 'helpers/utils';
// import User from 'helpers/User';

const COMPONENT_SLICK = {
  buildingsSquare: 'slickLeft',
  buildingsGrid: 'slickGrid',
  buildingsSeen: 'slickLarge',
  buildingsForYou: 'slickSmall'
};

import { Container, Banner, GroupSlider } from 'pages/Home/styles';

function Home ({ hero, components }) {
  const [ buildingsSeen, setBuildingsSeen ] = useState([]);
  const [ buildingsForYou, setBuildingsForYou ] = useState([]);

  useEffect(() => {
    async function loadBuildinsSeen () {
      // const buildingsSeenCookie = User.getBuildingsSeen();
      // console.log('buildingsSeenCookie: ', buildingsSeenCookie);

      const AX2629 = await Api.Building.getPage('AX2629');
      const AX10010 = await Api.Building.getPage('AX10010');
      const AX130883 = await Api.Building.getPage('AX130883');

      setBuildingsSeen([ AX2629, AX10010, AX130883, AX10010 ]);
      setBuildingsForYou([
        AX2629,
        AX10010,
        AX130883,
        AX2629,
        AX10010,
        AX130883,
        AX2629,
        AX10010,
        AX130883
      ]);
    }
    loadBuildinsSeen();
  }, []);

  function renderComponents (type, component) {
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
              <img src={component.images.desktop} alt="" />
            </Banner>
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
            <SlickSection
              type={COMPONENT_SLICK[type]}
              items={component.items}
            />
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
              buildingsSeen &&
              buildingsSeen.length > 2 && (
                <PanelBuildings
                  key={c.type}
                  className={c.type}
                  title="Imóveis que você viu"
                >
                  <GroupSlider>
                    {renderComponents('buildingsSeen', {
                      items: buildingsSeen
                    })}
                  </GroupSlider>
                </PanelBuildings>
              )
            );
          } else if (c.type === 'buildingsForYou') {
            return (
              buildingsForYou &&
              buildingsForYou.length > 0 && (
                <PanelBuildings
                  key={c.type}
                  className={c.type}
                  title="Indicados para você"
                  subTitle="Selecionamos alguns imóveis que acabaram de chegar"
                >
                  <GroupSlider>
                    {renderComponents('buildingsForYou', {
                      items: buildingsForYou
                    })}
                  </GroupSlider>
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
}

Home.getInitialProps = async () => {
  const response = await Api.Home.getPage();
  const components = response.components;
  return { hero: response.hero, components };
};

export default Home;
