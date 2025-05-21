import React, { Fragment, useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Api from 'services';

// actions
import { setMain } from 'store/modules/main/actions';

// helpers
import { shuffle } from 'helpers/utils';
import SeoData from 'helpers/seo';
import CookieBuildingSeen from 'helpers/cookieBuildingSeen';

// components
import BuildingsPanel from 'components/BuildingsPanel';
import BlockHighlighted from 'components/BlockHighlighted';
import Tag from 'components/Tag';
import NewsletterFooter from 'components/NewsletterFooter';
import CategoryBannerVertical from 'components/CategoryBannerVertical';

// styles
import {
  Container,
  Banner,
  Hero,
  HeroItem,
  HeroLink,
  HeroItemWrapper,
  HeroItemInfo,
} from 'pages/Home/styles';
import CategorySection from '../src/components/CategorySection';
import { PlaceholderImageDesk, PlaceholderImageMob } from '../src/pages/Home/styles';

const SliderNew = dynamic(() => import('components/SliderNew'), {
  loading: () => <></>,
});

function Home({ hero, components }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    query: { action },
  } = router;
  const [ buildingsSeen, setBuildingsSeen ] = useState([]);
  const [ buildingsForYou, setBuildingsForYou ] = useState([]);
  const [ heroItems, setHeroItems ] = useState([]);
  const [ showSlider, setShowSlider ] = useState(false);
  const sliderRef = useRef(null);

  const heroSettings = (totalItems) => ({
    dots: true,
    infinite: true,
    fade: true,
    lazyLoad: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: i => (
      <span>
        { (i + 1) + ' / ' + totalItems }
      </span>
    ),
  });

  useEffect(() => {
    if (!sliderRef.current) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowSlider(true);
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
      }
    );
  
    observer.observe(sliderRef.current);
  
    return () => {
      observer.disconnect();
    };
  }, []);

  const renderComponents = useCallback((type, component) => {
    // console.log(type, component)
    switch (type) {
      case 'banner':
        return (
          <>
            <Banner
              href={component.link.url}
              target={component.link.external ? '_blank' : '_self'}
              mq="mobile"
              className="holos-home-banner"
              data-label="mobile-banner"
            >
              <img src={component.images.mobile} alt="Foto imóvel banner" loading='lazy'/>
            </Banner>
            <Banner
              href={component.link.url}
              target={component.link.external ? '_blank' : '_self'}
              mq="desktop"
              className="holos-home-banner"
              data-label="desktop-banner"
            >
              <img src={component.images.desktop} alt="Foto imóvel banner" loading='lazy'/>
            </Banner>
          </>
        );
      case 'category':
        return (
          <CategoryBannerVertical categoryItems={component.items}/>
        );
      case 'exclusivity':
        return (
          <Hero>
            <SliderNew
              type="full"
              arrowsColor="white"
              arrowsClassName="holos-home-exclusivity-arrow"
              settings={heroSettings(component.items.length)}
            >
              {component.items.map((item, itemIndex) => (
                <HeroItem key={`exclusivity-item-${itemIndex}`}>
                  {item.link &&
                    item.link.url &&
                    (item.link.target === 'blank' ||
                      item.link.target === 'self') && (
                      <HeroLink
                        href={item.link.url}
                        target={`_${item.link.target}`}
                      >
                        {renderHeroItem(item, itemIndex)}
                      </HeroLink>
                    )}
                  {!item.link || !item.link.url ? renderHeroItem(item, itemIndex) : null}
                </HeroItem>
              ))}
            </SliderNew>
          </Hero>
        );
        // case 'buildingsSquare':
      case 'buildingsGrid':
       return (
         <CategorySection items={component.items} />
       );
      case 'gallery':
        return (
          <Hero>
            <SliderNew
              type="full"
              arrowsColor="white"
              arrowsClassName="holos-home-gallery-arrow"
              settings={heroSettings(component.items.length)}
            >
              {component.items.map((item, itemIndex) => (
                <HeroItem key={`gallery-item-${itemIndex}`}>
                  {item.link &&
                    item.link.url &&
                    (item.link.target === 'blank' ||
                      item.link.target === 'self') && (
                      <HeroLink
                        href={item.link.url}
                        target={`_${item.link.target}`}
                      >
                        {renderHeroItem(item, itemIndex)}
                      </HeroLink>
                    )}
                  {!item.link || !item.link.url ? renderHeroItem(item, itemIndex) : null}
                </HeroItem>
              ))}
            </SliderNew>
          </Hero>
        );
        case 'highlights':
          return (
            <Hero>
              <SliderNew
                type="full"
                arrowsColor="white"
                arrowsClassName="holos-home-highlights-arrow"
                settings={heroSettings(component.items.length)}
              >
                {component.items.map((item, itemIndex) => (
                  <HeroItem key={`highlights-item-${itemIndex}`}>
                    {item.link &&
                      item.link.url &&
                      (item.link.target === 'blank' ||
                        item.link.target === 'self') && (
                        <HeroLink
                          href={item.link.url}
                          target={`_${item.link.target}`}
                        >
                          {renderHeroItem(item, itemIndex)}
                        </HeroLink>
                      )}
                    {!item.link || !item.link.url ? renderHeroItem(item, itemIndex) : null}
                  </HeroItem>
                ))}
              </SliderNew>
            </Hero>
          );
      case 'contact':
        return (
        <>
          <NewsletterFooter/>
          <BlockHighlighted type="contactHome" />
        </>
      );
    }
  }, []);

  const randomizeHeroItems = useCallback(() => {
    if (Object.keys(heroItems).length === 0) {
      setHeroItems(shuffle(hero));
    }

    return heroItems;
  });

  const renderHeroItem = (item, itemIndex) => {
    const hasContent = item.title || item.content || item.text ? true : false;
    const itemLink = item.link ? item.link : item.link.url
    const itemContent = item.content ? item.content : item.text
    
    return (
      <HeroItemWrapper hasContent={hasContent}>
        <div className="hero-image mobile">
          <Image
            src={item.images.mobile}
            alt={item.title}
            layout='fill'
            priority={itemIndex === 0}
          />
        </div>
        <div className="hero-image desktop">
          <Image
            src={item.images.desktop}
            alt={item.title}
            layout='fill'
            priority={itemIndex === 0}
            sizes="(max-width: 768px) 100vw, 1280px"
          />
        </div>
        {hasContent && (
          <HeroItemInfo className="hero-info">
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
            {itemContent && <p>{itemContent}</p>}
            {itemLink && <span>Saiba mais</span>}
          </HeroItemInfo>
        )}
      </HeroItemWrapper>
    );
  };

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
        <Hero ref={sliderRef}>
          {!showSlider ? (
            <>
              <PlaceholderImageDesk>
                <Image
                  src="/static/homedesk-placeholder.png"
                  alt="Imagem inicial do banner desktop"
                  width={1280}
                  height={720}
                  priority
                  placeholder="empty"
                />
              </PlaceholderImageDesk>

              <PlaceholderImageMob>
                <Image
                  src="/static/homemob-placeholder.png"
                  alt="Imagem inicial do banner mobile"
                  width={375}
                  height={375}
                  priority
                  placeholder="empty"
                />
              </PlaceholderImageMob>
            </>
          ) : (
            <SliderNew
              type="full"
              arrowsColor="white"
              arrowsClassName="holos-home-hero-arrow"
              settings={heroSettings(heroItems.length)}
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
                        {renderHeroItem(item, itemIndex)}
                      </HeroLink>
                    )}
                  {!item.link || !item.link.url ? renderHeroItem(item, itemIndex) : null}
                </HeroItem>
              ))}
            </SliderNew>
          )}
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
                  buildingLayout="vertical"
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
