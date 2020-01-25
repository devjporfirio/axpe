import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Slider from 'react-slick';
import Link from 'next/link'
import { useRouter } from 'next/router'
import Api from 'services';

// data
import DataJSON from 'pages/Dream/data.json';

// helpers
import SeoData from 'helpers/seo';

// components
import BlockHighlighted from 'components/BlockHighlighted';
import Building from 'components/Building';

// styles
import { Container, Header, List, Footer, FooterListItemLink } from 'pages/Dream/Detail/styles';

// styles
import {
  Buildings,
  BuildingsNotFound,
} from 'pages/Search/styles'

function DreamDetail({ buildings }) {
  const router = useRouter();
  const { query: { slug } } = router;
  const [ allData, setAllData ] = useState(null);
  const [ data, setData ] = useState(null);

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    draggable: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    function getData() {
      const results = DataJSON.data.filter(item => item.slug === slug);
      if(results.length) {
        setData(results[0]);
      }
      setAllData(DataJSON.data);
    }

    getData();
  }, [ ]);

  return data ? (
    <>
      <Head>
        <title>{`${data.title} | So quero sonhar - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        <Header>
          <h1>Só quero Sonhar <span>{data.title}</span></h1>
          {data.subtitle && <p>{data.subtitle}</p>}
        </Header>

        <List>
          <h2>Confira nossa seleção com as casas mais <span>{data.title}</span></h2>
          <Buildings>
            {buildings && buildings.length > 0 ? buildings.map((building, buildingIndex) => (
                <Building item={building} key={`building-searchitem-${building.reference}-${buildingIndex}`} />
              )) : (
              <BuildingsNotFound>
                <h6>Não encontramos o imóveis na categoria que você procura <span>:(</span></h6>
                <p>Tente fazer uma <a href="/search">busca!</a></p>
              </BuildingsNotFound>
            )}
          </Buildings>
        </List>

        <Footer>
          <h2>Sonhe também com:</h2>
          <Slider {...sliderSettings}>
            {allData.map((item, itemIndex) => (
              <article className="item" key={`dream-slider-item-${itemIndex}`}>
                <Link href={`/so-quero-sonhar/${item.slug}`} passHref>
                  <FooterListItemLink style={{ backgroundImage: `url(/static/dream/cover-${item.slug}.jpg)` }}>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </FooterListItemLink>
                </Link>
              </article>
            ))}
          </Slider>
        </Footer>
        <BlockHighlighted type="dream" />
      </Container>
    </>
  ) : null;
}

DreamDetail.getInitialProps = async ({ query }) => {
  const response = await Api.Dream.getPage(query.slug);
  return {
    total: response.total,
    buildings: response.data
  };
}

export default DreamDetail;