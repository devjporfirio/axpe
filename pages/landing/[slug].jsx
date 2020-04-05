import React, { useState } from 'react';
import Head from 'next/head';
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
  Gradient,
  Title,
  GroupText,
  Text,
  SeeMore,
  Banner,
  Link,
  Module,
  TitleModule,
  TextModule,
  SlideSmall
} from 'pages/Landing/styles';

function Landing({ slug, page }) {
  const [ transparent, setTranspatent ] = useState(false);
  const { images, imagesBanner, title, text, componentes } = page;

  return slug ? (
    <>
      <Head>
        <title>{`${title} - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        {images.desktop || images.mobile ? (
          <Hero>
            <Gradient />
            <Image mq="desktop" src={images.desktop} />
            <Image mq="mobile" src={images.mobile} />
          </Hero>
        ) : null}
        <Title>{title}</Title>
        <hr />
        <GroupText>
          <Text transparent={transparent}>{text}</Text>
          {!transparent && (
            <SeeMore type="button" onClick={() => setTranspatent(true)}>
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
                      comp.buildings.map(building => (
                        <BuildingList item={building} key={building.reference} />
                      ))}
                  </Module>
                );
              case 'imoveis-horizontal':
                return (
                  <Module key={`landing-component-${index}`}>
                    <TitleModule>
                      <strong>
                        {comp.total_buildings} {comp.info.title}
                      </strong>{' '}
                      {comp.info.subtitle}
                    </TitleModule>
                    <TextModule>{comp.info.text}</TextModule>
                    <SlideSmall type="slickSmall" items={comp.buildings} />
                  </Module>
                );
            }
          })}

        {
          Object.keys(imagesBanner).length > 0 &&
          imagesBanner.desktop &&
          imagesBanner.mobile && (
            <Banner>
              <Image mq="desktop" src={imagesBanner.desktop} />
              <Image mq="mobile" src={imagesBanner.mobile} />

              <Link
                href={imagesBanner.link.url}
                target={imagesBanner.link.external ? '_blank' : '_self'}
              >
                Saiba Mais
              </Link>
            </Banner>
          )}

        <BlockHighlighted type="notfound" />
        <Contact />
      </Container>
    </>
  ) : null;
}

Landing.getInitialProps = async ({ query }) => {
  const slug = query.slug;
  const response = await Api.Landing.getPage(slug);

  return {
    slug,
    page: response
  };
};

export default Landing;
