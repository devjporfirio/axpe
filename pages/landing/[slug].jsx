import React, { useState, useEffect, useRef } from 'react';
import Api from 'services';

// helpers
import SeoData from 'helpers/seo';

// components
import BuildingList from 'components/Building/List';
import BlockHighlighted from 'components/BlockHighlighted';
import Contact from 'components/Contact';

// styles
import {
  Container,
  Hero,
  Image,
  // Gradient,
  Title,
  GroupText,
  TextContainer,
  Text,
  SeeMore,
  Banner,
  Module,
  TitleModule,
  TextModule,
  SlideSmall,
} from 'pages/Landing/styles';

function Landing({ slug, page }) {
  const textEl = useRef();
  const [ transparent, setTransparent ] = useState(false);
  const { images, imagesBanner, title, text, componentes } = page;

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

  return (
    <Container>
      {images.desktop || images.mobile ? (
        <Hero>
          {/* <Gradient /> */}
          <Image mq="desktop" src={images.desktop} />
          <Image mq="mobile" src={images.mobile} />
        </Hero>
      ) : null}
      <Title>{title}</Title>
      <hr />
      <GroupText>
        <TextContainer transparent={transparent}>
          <Text ref={textEl}>{text}</Text>
        </TextContainer>
        {!transparent && (
          <SeeMore type="button" onClick={() => setTransparent(true)}>
            Veja Mais
          </SeeMore>
        )}
      </GroupText>

      {componentes &&
        componentes.length > 0 &&
        componentes.map((comp, index) => {
          switch (comp.type) {
            case 'imoveis-vertical':
              return (
                <Module key={`landing-component-${index}`}>
                  <TitleModule>
                    <strong>{comp.info.title}</strong> {comp.info.subtitle}
                  </TitleModule>
                  <TextModule>{comp.info.text}</TextModule>

                  {comp.buildings &&
                    comp.buildings.length > 0 &&
                    comp.buildings.map((building) =>
                      building && building.status === 'active' ? (
                        <BuildingList
                          key={building.reference}
                          item={building}
                        />
                      ) : null
                    )}
                </Module>
              );
            case 'imoveis-horizontal':
              return (
                <Module key={`landing-component-${index}`}>
                  <TitleModule>
                    <strong>{comp.info.title}</strong> {comp.info.subtitle}
                  </TitleModule>
                  <TextModule>{comp.info.text}</TextModule>
                  <SlideSmall type="slickSmall" items={comp.buildings} />
                </Module>
              );
          }
        })}

      {Object.keys(imagesBanner).length > 0 &&
        imagesBanner.desktop &&
        imagesBanner.mobile && (
          <Banner
            href={imagesBanner.link.url}
            target={
              imagesBanner.link.external || imagesBanner.link.target !== 'self'
                ? '_blank'
                : '_self'
            }
          >
            <Image mq="desktop" src={imagesBanner.desktop} />
            <Image mq="mobile" src={imagesBanner.mobile} />
          </Banner>
        )}

      <BlockHighlighted type="notfound" />
      <Contact />
    </Container>
  );
}

Landing.getInitialProps = async ({ query }) => {
  const slug = query.slug;
  const response = await Api.Landing.getPage(slug);

  const pageTitle = `${response.title} ${SeoData.shortTitle}`;
  const pageDesc = `${response.title}. Aqui na Axpe você encontra o imóvel perfeito para suas necessidades!`;

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

export default Landing;
