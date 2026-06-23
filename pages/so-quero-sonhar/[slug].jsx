import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Slider from 'react-slick';
import { useRouter } from 'next/router';
import Api from 'services';
import GTM from 'helpers/gtm';

// data
import DataJSON from 'pages/Dream/data.json';

// helpers
import Link from 'next/link';
import SeoData from 'helpers/seo';

// components
import BuildingList from 'components/Building/List';
import BlockHighlighted from 'components/BlockHighlighted';

// styles
import { Container, Header, List, Footer } from 'pages/Dream/Detail/styles';
import {
  ListButton,
  ListText,
  ListImage
} from 'pages/Dream/styles';

import {
  Buildings,
  BuildingsNotFound,
} from 'pages/Search/styles';

function DreamDetail({ buildings, pageDetails }) {
  const router = useRouter();
  const { query: { slug } } = router;

  const [allData, setAllData] = useState([]);
  const [data, setData] = useState(pageDetails || null);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const BASE_URL = API_URL.replace('/api', '');
  const IMAGE_PATH = `${BASE_URL}/uploads/images/so-quero-sonhar`;

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
    async function getData() {
      try {
        const response = await fetch(`${API_URL}/so-quero-sonhar`);
        const result = await response.json();

        if (result.success && result.data) {
          const items = result.data;

          const currentItem = items.find((item) => {
            const itemSlug = item.link?.replace(/^\/+/, '');

            return itemSlug === slug;
          });

          setAllData(items);
          setData(currentItem || pageDetails || null);
        }

        GTM.dataLayerPush({
          searchFilters: 'Só Quero Sonhar'
        });
      } catch (error) {
        console.error('Erro ao carregar Só Quero Sonhar:', error);
      }
    }

    if (slug) {
      getData();
    }
  }, [API_URL, slug, pageDetails]);

  return data ? (
    <>
      <Head>
        <title>Imóveis {data.title} para se inspirar {SeoData.shortTitle}</title>
        <meta
          name="description"
          content={`Venha conhecer esta seleção dos melhores imóveis ${data.title} para você se inspirar na hora de comprar ou alugar seu imóvel. Confira!`}
        />
      </Head>

      <Container>
        <Header>
          <h1>
            Só quero Sonhar <span>{data.title}</span>
          </h1>

          {data.subtitle && <p>{data.subtitle}</p>}
        </Header>

        <List>
          <Buildings>
            {buildings && buildings.length > 0 ? (
              buildings.map((building, buildingIndex) => (
                <BuildingList
                  item={building}
                  page="search-dream"
                  positionIndex={buildingIndex + 1}
                  key={`building-searchitem-${building.reference}-${buildingIndex}`}
                />
              ))
            ) : (
              <BuildingsNotFound>
                <h6>
                  Não encontramos imóveis na categoria que você procura <span>:(</span>
                </h6>
                <p>
                  Tente fazer uma <a href="/search">busca!</a>
                </p>
              </BuildingsNotFound>
            )}
          </Buildings>
        </List>

        {allData && allData.length > 0 && (
          <Footer>
            <h2>Sonhe também com:</h2>

            <Slider {...sliderSettings}>
              {allData
                .filter((item) => {
                  const itemSlug = item.link?.replace(/^\/+/, '');
                  return itemSlug !== slug;
                })
                .map((item) => {
                  const itemSlug = item.link?.replace(/^\/+/, '');

                  return (
                    <article key={`dreamsingle-list-item-${item.id}`}>
                      <Link href={`/so-quero-sonhar/${itemSlug}`} passHref>
                        <ListButton>
                          <ListText>
                            <h3>{item.title}</h3>
                            <p>{item.subtitle}</p>
                          </ListText>

                          <ListImage
                            src={`${IMAGE_PATH}/${item.image_url}`}
                            alt={item.title}
                          />
                        </ListButton>
                      </Link>
                    </article>
                  );
                })}
            </Slider>
          </Footer>
        )}

        <BlockHighlighted type="contactHome" />
      </Container>
    </>
  ) : null;
}

DreamDetail.getInitialProps = async ({ query }) => {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const responseDream = await fetch(`${API_URL}/so-quero-sonhar`);
  const resultDream = await responseDream.json();

  const apiDreams = resultDream?.success ? resultDream.data : [];

  const apiPageDetails = apiDreams.find((item) => {
    const itemSlug = item.link?.replace(/^\/+/, '');

    return itemSlug === query.slug;
  });

  const pageDetailsJson = DataJSON.data.filter(
    (item) => item.url === query.slug
  )[0];

  if (!pageDetailsJson) {
    return {
      total: 0,
      buildings: [],
      pageDetails: apiPageDetails || null,
      meta: {
        title: `Só Quero Sonhar ${SeoData.shortTitle}`,
        description: SeoData.description,
        image: null
      }
    };
  }

  const response = await Api.Dream.getPage(pageDetailsJson.slug);

  const pageDetails = {
    ...pageDetailsJson,
    ...apiPageDetails,
    slug: pageDetailsJson.slug,
    url: pageDetailsJson.url
  };

  const pageTitle = `Imóveis ${pageDetails.title} para se inspirar ${SeoData.shortTitle}`;
  const pageDesc = `Venha conhecer esta seleção dos melhores imóveis ${pageDetails.title} para você se inspirar na hora de comprar ou alugar seu imóvel. Confira!`;

  const pageBanner =
    response?.data?.[0]?.imageFeatured?.desktop
      ? response.data[0].imageFeatured.desktop
      : null;

  return {
    total: response.total,
    buildings: response.data,
    pageDetails,
    meta: {
      title: pageTitle,
      description: pageDesc,
      image: pageBanner
    }
  };
};

export default DreamDetail;