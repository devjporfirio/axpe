import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Head from 'next/head';
import Api from 'services';

// components
import SlickSection from 'components/SlickSection';
import PanelBuildings from 'components/PanelBuildings';
import BlockHighlighted from 'components/BlockHighlighted';
import SliderNew from 'components/SliderNew';
import Contact from 'components/Contact';

// helpers
import { shuffle } from 'helpers/utils';
import SeoData from 'helpers/seo';
import CookieBuildingSeen from 'helpers/cookieBuildingSeen';

// styles
import {
  Container,
  Banner,
  GroupSlider,
  Hero,
  HeroItem,
  HeroImage,
  HeroItemWrapper,
  HeroItemInfo
} from 'pages/Home/styles';

const COMPONENT_SLICK = {
  buildingsSquare: 'slickLeft',
  buildingsGrid: 'slickGrid',
  buildingsSeen: 'slickLarge',
  buildingsForYou: 'slickSmall'
};

function Home({ hero, components }) {
  const user = useSelector(state => state.user);
  const [ buildingsSeen, setBuildingsSeen ] = useState([]);
  const [ buildingsForYou, setBuildingsForYou ] = useState([]);
  const heroSettings = {
    dots: false,
    infinite: false,
    fade: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const renderComponents = useCallback((type, component) => {
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
          component.items = shuffle(component.items);
        }
        return (
          component.items &&
          component.items.length > 0 && (
            <SlickSection
              type={COMPONENT_SLICK[type]}
              items={component.items}
              useButtom
            />
          )
        );
      case 'contact':
        return <BlockHighlighted type="contactHome" />;
    }
  }, []);

  const renderHeroItem = useCallback((item) => {
    const hasContent = (item.title || item.content) ? true : false;

    return (
      <>
        <HeroItemWrapper hasContent={hasContent}>
          <HeroImage mq="mobile" src={item.images.mobile} alt={item.title} />
          <HeroImage mq="desktop" src={item.images.desktop} alt={item.title} />
          {item.title || item.content ? (
            <HeroItemInfo>
              {item && (
                <h2>{item.title}</h2>
              )}
              {item.content && (
                <p>{item.content}</p>
              )}
            </HeroItemInfo>
          ) : null}
        </HeroItemWrapper>
      </>
    )
  }, []);

  useEffect(() => {
    async function loadBuildinsSeen() {
      if (user.logged) {
        const responseBuildingsSeen = await Api.MyAccount.getViewed(user.access_token);
        const responseBuildingsForYou = await Api.MyAccount.getForYou(user.access_token);

        if(!responseBuildingsSeen.length) return false;

        setBuildingsSeen(responseBuildingsSeen);

        if(responseBuildingsForYou && responseBuildingsForYou.buildings && responseBuildingsForYou.buildings.length) {
          setBuildingsForYou(responseBuildingsForYou.buildings);
        }
      } else if (!user.logged) {
        const buildingsSeenCookie = CookieBuildingSeen.get();

        if (!buildingsSeenCookie.length) return false;

        const listBuildingsSeen = await Promise.all(
          buildingsSeenCookie.map(async b => {
            const building = await Api.Building.getPage(b);
            return building;
          })
        );

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

        setBuildingsSeen(listBuildingsSeen);

        if (listForYou && listForYou.length) {
          setBuildingsForYou(listForYou);
        }
      }
    }

    loadBuildinsSeen();
  }, []);

  return (
    <>
      <Head>
        <title>{SeoData.title}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>

        <Hero>
          <SliderNew arrowsColor="white" hasVerticalBar={true} settings={heroSettings}>
            {hero.map((item, itemIndex) => (
              <HeroItem key={`hero-item-${itemIndex}`}>
                {item.link.target === 'blank' && item.link.url && (
                  <HeroItemLink href={item.link.url} target="_blank">
                    {renderHeroItem(item)}
                  </HeroItemLink>
                )}
                {item.link.target === 'self' && item.link.url && (
                  <Link href={item.link.url} passHref>
                    {renderHeroItem(item)}
                  </Link>
                )}
                {!item.link || !item.link.url ? renderHeroItem(item) : null}
              </HeroItem>
            ))}
          </SliderNew>
        </Hero>

        {/* <SlickSection name="hero" useGradient={true} color="white" items={hero} /> */}

        {components &&
          components.length > 0 &&
          components.map((c, cIndex) => {
            if (c.type === 'buildingsSeen') {
              return (
                buildingsSeen &&
                buildingsSeen.length > 0 && (
                  <PanelBuildings
                    key={`panel-buildings-0-${c.type}-${cIndex}`}
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
                    key={`panel-buildings-1-${c.type}-${cIndex}`}
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
              <Fragment key={`fragment-2-${c.type}-${cIndex}`}>{renderComponents(c.type, c)}</Fragment>
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
