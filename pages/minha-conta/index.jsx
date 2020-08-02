import React, { Fragment, useEffect, useState } from 'react';
import Api from 'services';
import { useSelector } from 'react-redux';
import Head from 'next/head';

// helpers
import SeoData from 'helpers/seo';

// components
import SliderNew from 'components/SliderNew';
import BuildingCard from 'components/Building/Card';
import Empty from 'pages/MyAccount/Empty';

// styles
import { Title } from 'pages/MyAccount/styles';
import {
  Container,
  Header,
  Subtitle,
  Items,
  ItemsTitle
} from 'pages/MyAccount/Viewed/styles';

function Viewed() {
  const user = useSelector(state => state.user);
  const [ loaded, setLoaded ] = useState(false);
  const [ views, setViews ] = useState([]);
  const settings = {
    dots: false,
    infinite: false,
    lazyLoad: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  useEffect(() => {
    async function loadBuildings() {
      if (user && user.access_token) {
        const buildingViewed = await Api.MyAccount.getViewed(user.access_token);
        setViews(buildingViewed);
        setLoaded(true);
      }
    }

    loadBuildings();
  }, [ user ]);

  const group =
    views &&
    views.length > 0 &&
    views.reduce(function(h, obj) {
      h[obj['viewedAt']] = (h[obj['viewedAt']] || []).concat(obj);
      return h;
    }, {});

  if (!user.logged || !loaded) return <Container />;

  return (
    <>
      <Head>
        <title>{`Minha Conta - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>

        {Object.keys(group).length > 0 ? (
          <>
            <Header>
              <Title>
                Refresque a memória.
              </Title>
              <Subtitle>Imóveis que você viu recentemente.</Subtitle>
            </Header>
            {Object.keys(group).map((item, itemIndex) => (

              <Fragment key={`row-viewed-${itemIndex}`}>
                <Items>
                  <ItemsTitle>{item}</ItemsTitle>
                  <SliderNew
                    type="normal"
                    arrowsColor="greenDark"
                    settings={settings}
                  >
                    {group[item].map((building, buildingIndex) => (
                      <BuildingCard
                        key={`building-viewed-${building.reference}-${buildingIndex}`}
                        layout="vertical"
                        item={building}
                        gtmShowcase="Imóvel Recente"
                        positionIndex={buildingIndex + 1}
                      />
                    ))}
                  </SliderNew>
                </Items>
                {Object.keys(group).length - 1 > itemIndex && <hr />}
              </Fragment>
            ))}
          </>
        ) : (
          <Empty
            title="Você ainda não visualizou nenhum imóvel"
            subtitle="Navegue pelo site, visualize imóveis, e eles ficarão disponíveis para visualizações futuras aqui."
          />
        )}
      </Container>
    </>
  );
}

export default Viewed;
