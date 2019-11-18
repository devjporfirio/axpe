import React, { useState } from 'react';
import Api from 'services';
import Building from 'components/Building';
import BlockHighlighted from 'components/BlockHighlighted';
import Contact from 'components/Contact';

// styles
import {
  Container,
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
    <Container>
      <Gradient />
      {Object.keys(images) && (
        <>
          <Image mq="desktop" src={images.desktop} />
          <Image mq="mobile" src={images.mobile} />
        </>
      )}
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
        componentes.map(comp => {
          switch (comp.type) {
            case 'imoveis-vertical':
              return (
                <Module>
                  <TitleModule>
                    <strong>Casas lindas</strong> com lareira e vistas incríveis
                  </TitleModule>
                  <TextModule>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </TextModule>

                  {comp.buildings &&
                    comp.buildings.length > 0 &&
                    comp.buildings.map(building => (
                      <Building item={building} key={building.reference} />
                    ))}
                </Module>
              );
            case 'imoveis-horizontal':
              return (
                <Module>
                  <TitleModule>
                    <strong>{comp.total_buildings}</strong> Casas charmosas e
                    aconchegantes
                  </TitleModule>
                  <TextModule>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </TextModule>
                  <SlideSmall type="slickSmall" items={comp.buildings} />
                </Module>
              );
          }
        })}
      <Banner>
        {Object.keys(imagesBanner) && (
          <>
            <Image mq="desktop" src={imagesBanner.desktop} />
            <Image mq="mobile" src={imagesBanner.mobile} />
          </>
        )}
        <Link
          href={imagesBanner.link.url}
          target={imagesBanner.link.external ? '_blank' : '_self'}
        >
          Saiba Mais
        </Link>
      </Banner>
      <BlockHighlighted type="landing" />
      <Contact />
    </Container>
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
