import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Api from 'services';

// actions
import { setMain } from 'store/modules/main/actions';

// helpers
import { shuffle } from 'helpers/utils';
import SeoData from 'helpers/seo';
import CookieBuildingSeen from 'helpers/cookieBuildingSeen';

// components
import PasswordNewModal from 'components/Modals/PasswordNew';
import SlickSection from 'components/SlickSection';
import BuildingsPanel from 'components/BuildingsPanel';
import BlockHighlighted from 'components/BlockHighlighted';
import SliderNew from 'components/SliderNew';
import GalleryCarousel from 'components/GalleryCarousel';
import Contact from 'components/Contact';
import Tag from 'components/Tag';

// styles
import {
  Container,
  Banner,
  Hero,
  HeroItem,
  HeroLink,
  HeroImage,
  HeroItemWrapper,
  HeroItemInfo,
} from 'pages/Home/styles';

const COMPONENT_SLICK = {
  buildingsSquare: 'slickLeft',
  buildingsGrid: 'slickGrid',
};

function Home({ hero, components }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    query: { action, hash },
  } = router;
  const user = useSelector((state) => state.user);
  const [ buildingsSeen, setBuildingsSeen ] = useState([]);
  const [ buildingsForYou, setBuildingsForYou ] = useState([]);
  const [ heroItems, setHeroItems ] = useState([]);

  const heroSettings = {
    dots: false,
    infinite: true,
    fade: true,
    lazyLoad: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
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
              className="holos-home-banner"
              data-label=""
            >
              <img src={component.images.mobile} alt="" />
            </Banner>
            <Banner
              href={component.link.url}
              target={component.link.external ? '_blank' : '_self'}
              mq="desktop"
              className="holos-home-banner"
              data-label=""
            >
              <img src={component.images.desktop} alt="" />
            </Banner>
          </>
        );
      case 'buildingsSquare':
      case 'buildingsGrid':
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
      case 'gallery':
        return <GalleryCarousel {...component} />;
      case 'contact':
        return <BlockHighlighted type="contactHome" />;
    }
  }, []);

  const randomizeHeroItems = useCallback(() => {
    if (Object.keys(heroItems).length === 0) {
      setHeroItems(shuffle(hero));
    }

    return heroItems;
  });

  const renderHeroItem = useCallback((item) => {
    const hasContent = item.title || item.content ? true : false;

    return (
      <>
        <HeroItemWrapper hasContent={hasContent}>
          <HeroImage mq="mobile" src={item.images.mobile} alt={item.title} />
          <HeroImage mq="desktop" src={item.images.desktop} alt={item.title} />
          {item.title || item.content ? (
            <HeroItemInfo>
              {item.label && item.label == 'isExclusive' ? (
                <Tag label={'Exclusividade'} icon="check" color="orange" />
              ) : item.label == 'isNew' ? (
                <Tag label={'Novidade'} icon="star" color="blueLight" />
              ) : item.label == 'isFurnished' ? (
                <Tag label={'Mobiliado'} icon="sofa" color="greenLight" />
              ) : null}
              {item && item.title && (
                <h2 className={item.title && item.content && 'with-separator'}>
                  {item.title}
                </h2>
              )}
              {item.content && <p>{item.content}</p>}
              {item.link.url && <span>Saiba mais</span>}
            </HeroItemInfo>
          ) : null}
        </HeroItemWrapper>
      </>
    );
  }, []);

  useEffect(() => {
    function checkActionParams() {
      if (action) {
        dispatch(
          setMain({
            modalPasswordNew: true,
          })
        );
      }
    }

    async function loadBuildinsSeen() {
      if (user.logged) {
        const responseBuildingsSeen = await Api.MyAccount.getViewed(
          user.access_token
        );
        const responseBuildingsForYou = await Api.MyAccount.getForYou(
          user.access_token
        );

        if (!responseBuildingsSeen.length) return false;

        setBuildingsSeen(responseBuildingsSeen);

        if (
          responseBuildingsForYou &&
          responseBuildingsForYou.buildings &&
          responseBuildingsForYou.buildings.length
        ) {
          setBuildingsForYou(responseBuildingsForYou.buildings);
        }
      } else {
        const buildingsSeenCookie = CookieBuildingSeen.get();

        if (!buildingsSeenCookie.length) return false;

        const listBuildingsSeen = await Api.Search.getBuildings(
          `?reference=${buildingsSeenCookie.join(',')}`
        );
        const listForYou = await Api.Building.getSimilar(
          listBuildingsSeen.data[0],
          10
        );

        setBuildingsSeen(listBuildingsSeen.data);

        if (listForYou && listForYou.total) {
          setBuildingsForYou(listForYou.data);
        }
      }
    }

    checkActionParams();
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
          <SliderNew
            type="full"
            arrowsColor="white"
            hasVerticalBar={true}
            arrowsClassName="holos-home-hero-arrow"
            settings={heroSettings}
          >
            {randomizeHeroItems().map((item, itemIndex) => (
              <HeroItem key={`hero-item-${itemIndex}`}>
                {item.link &&
                  item.link.url &&
                  (item.link.target === 'blank' ||
                    item.link.target === 'self') && (
                    <HeroLink
                      href={item.link.url}
                      target={`_${item.link.target}`}
                    >
                      {renderHeroItem(item)}
                    </HeroLink>
                  )}
                {!item.link || !item.link.url ? renderHeroItem(item) : null}
              </HeroItem>
            ))}
          </SliderNew>
        </Hero>

        {components &&
          components.length > 0 &&
          components.map((c, cIndex) => {
            if (c.type === 'buildingsSeen') {
              return buildingsSeen && buildingsSeen.length ? (
                <BuildingsPanel
                  itemClass="buildingsSeen"
                  key={`buildingspanel-0-${c.type}-${cIndex}`}
                  page="home"
                  title="Imóveis que você viu"
                  buildingLayout="horizontal"
                  data={buildingsSeen}
                />
              ) : null;
            } else if (c.type === 'buildingsForYou') {
              return buildingsForYou && buildingsForYou.length ? (
                <BuildingsPanel
                  itemClass="buildingsForYou"
                  key={`panel-buildings-1-${c.type}-${cIndex}`}
                  page="home"
                  title="Indicados para você"
                  subtitle="Selecionamos alguns imóveis que acabaram de chegar"
                  buildingLayout="vertical"
                  data={buildingsForYou}
                />
              ) : null;
            }
            return (
              <Fragment key={`fragment-2-${c.type}-${cIndex}`}>
                {renderComponents(c.type, c)}
              </Fragment>
            );
          })}

        <Contact />

        {action && action === 'senha-nova' && <PasswordNewModal hash={hash} />}
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
