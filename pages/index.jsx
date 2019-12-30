import React, { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import Api from 'services';

// components
import SlickSection from 'components/SlickSection';
import PanelBuildings from 'components/PanelBuildings';
import BlockHighlighted from 'components/BlockHighlighted';
import Contact from 'components/Contact';

// helpers
import { suffle } from 'helpers/utils';
import SeoData from 'helpers/seo';
import User from 'helpers/user';

// styles
import { Container, Banner, GroupSlider } from 'pages/Home/styles';

const COMPONENT_SLICK = {
  buildingsSquare: 'slickLeft',
  buildingsGrid: 'slickGrid',
  buildingsSeen: 'slickLarge',
  buildingsForYou: 'slickSmall'
};

function Home({ hero, components }) {
  const [ buildingsSeen, setBuildingsSeen ] = useState([]);
  const [ buildingsForYou, setBuildingsForYou ] = useState([]);

  useEffect(() => {
    async function loadBuildinsSeen() {
      let buildingsSeenCookie = User.getBuildingsSeen();

      if (!!buildingsSeenCookie) {
        buildingsSeenCookie = !!buildingsSeenCookie
          ? JSON.parse(buildingsSeenCookie)
          : [];

        const listBuildingsSeen = await Promise.all(
          buildingsSeenCookie.map(async b => {
            const building = await Api.Building.getPage(b);
            return building;
          })
        );

        if (listBuildingsSeen.length > 0) {
          let listForYou = await Api.Building.getSimilar(
            listBuildingsSeen[0].building,
            10
          );

          listForYou =
            listForYou &&
            listForYou.data &&
            listForYou.data.length > 0 &&
            listForYou.data.map(l => ({
              building: { ...l }
            }));
          setBuildingsForYou(listForYou);
          setBuildingsSeen(listBuildingsSeen);
        }
      }
    }
    loadBuildinsSeen();
  }, []);

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
        return <BlockHighlighted type="contactHome" />;
    }
  }

  return (
    <>
      <Head>
        <title>{SeoData.title}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        <SlickSection useGradient={true} color="white" items={hero} />
        {components &&
          components.length > 0 &&
          components.map(c => {
            if (c.type === 'buildingsSeen') {
              return (
                buildingsSeen &&
                buildingsSeen.length > 0 && (
                  <PanelBuildings
                    key={c.type}
                    className={c.type}
                    title="Imóveis que você viu"
                    isHome={true}
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
                    isHome={true}
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
    </>
  );
}

Home.getInitialProps = async () => {
  const response = await Api.Home.getPage();
  const components = response.components;
  return { hero: response.hero, components };
};

export default Home;
