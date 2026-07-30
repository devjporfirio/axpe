import React, { useState, useEffect, useRef } from 'react';
import Api from 'services';
import { useRouter } from 'next/router';
import Head from 'next/head';

// helpers
import SeoData from 'helpers/seo';
import { matchesFinality, sortBuildings, trimBuildingForListing } from 'pages/Landing/helpers';

// components
import NewContactSection from 'components/NewContactSection';
import TopBlockSection from 'pages/Landing/TopBlockSection';
import HeroSection from 'pages/Landing/HeroSection';
import ModuleCustomizada from 'pages/Landing/ModuleCustomizada';
import ModulePadrao from 'pages/Landing/ModulePadrao';
import BannerSection from 'pages/Landing/BannerSection';

// styles
import { Container } from 'pages/Landing/styles';

function Landing({ slug, page, meta }) {
  const textEl = useRef();
  const router = useRouter();
  const [ transparent, setTransparent ] = useState(false);
  const [ orderBy, setOrderBy ] = useState('latest');
  const [ finality, setFinality ] = useState('');
  const [ isOrderListActive, setIsOrderListActive ] = useState(false);
  const { images, imagesBanner, title, text, componentes, type, topBlock } = page;
  const isExclusividadesPage = router.pathname === '/landing/[slug]';
  const isCustomizada = type === 'customizada';

  useEffect(() => {
    if (
      window.innerWidth < 768 &&
      textEl.current &&
      textEl.current.offsetHeight < 160
    ) {
      setTransparent(true);
    }
  }, []);

  if (!slug) return null;

  const getBuildingsToRender = (comp) => {
    const raw = comp.buildings && comp.buildings.length > 0
      ? isExclusividadesPage
        ? [ ...comp.buildings ].sort((a, b) => b.id - a.id)
        : comp.buildings
      : [];

    if (!isCustomizada) return raw;

    const filtered = raw.filter((building) => matchesFinality(building, finality));
    return sortBuildings(filtered, orderBy);
  };

  const buildingPage = isCustomizada && isOrderListActive ? 'search' : undefined;

  return (
    <>
      <Head>
        <title>{meta?.title || 'Axpe Imóveis'}</title>
        <meta name="description" content={meta?.description || 'Imóveis de alto padrão'} />
        <meta property="og:title" content={meta?.title} />
        <meta property="og:description" content={meta?.description} />
        {meta?.image && <meta property="og:image" content={meta.image} />}
      </Head>

      <Container>
        {isCustomizada ? (
          <TopBlockSection topBlock={topBlock} />
        ) : (
          <HeroSection
            images={images}
            title={title}
            text={text}
            transparent={transparent}
            textRef={textEl}
            onSeeMore={() => setTransparent(true)}
          />
        )}

        {componentes &&
          componentes.length > 0 &&
          componentes.map((comp, index) =>
            isCustomizada ? (
              <ModuleCustomizada
                key={`landing-component-${index}`}
                buildings={getBuildingsToRender(comp)}
                buildingPage={buildingPage}
                isOrderListActive={isOrderListActive}
                onToggleLayout={() => setIsOrderListActive(!isOrderListActive)}
                finality={finality}
                onFinalityChange={setFinality}
                orderBy={orderBy}
                onOrderByChange={setOrderBy}
              />
            ) : (
              <ModulePadrao
                key={`landing-component-${index}`}
                comp={comp}
                buildings={getBuildingsToRender(comp)}
              />
            )
          )}

        <BannerSection imagesBanner={imagesBanner} />

        <NewContactSection />
      </Container>
    </>
  );
}

Landing.getInitialProps = async ({ query }) => {
  const slug = query.slug;
  const response = await Api.Landing.getPage(slug);

  if (response.componentes) {
    response.componentes = response.componentes.map((comp) => ({
      ...comp,
      buildings: (comp.buildings || []).map(trimBuildingForListing),
    }));
  }

  const pageTitle = `${response.meta_title ? response.meta_title : SeoData.title} ${SeoData.shortTitle}`;
  const pageDesc = `${response.meta_description ? response.meta_description : `${SeoData.description} | Aqui na Axpe você encontra o imóvel perfeito para suas necessidades!`}`;

  const pageBanner = response.images.desktop ? response.images.desktop : null;

  return {
    slug,
    page: response,
    meta: {
      title: pageTitle,
      description: pageDesc,
      image: pageBanner,
    },
  };
};

Landing.hideNewContactSection = true;

export default Landing;
