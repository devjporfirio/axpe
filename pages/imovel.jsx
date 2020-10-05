import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import GTM from 'helpers/gtm';
import Api from 'services';

// components
import Headerbar from 'components/Headerbar';
import BlockHighlighted from 'components/BlockHighlighted';
import Contact from 'components/Contact';
import BuildingList from 'components/Building/List';
import DataSheet from 'pages/Building/Datasheet';
import Modules from 'pages/Building/modules';

// helpers
import CookieBuildingSeen from 'helpers/cookieBuildingSeen';
import SeoData from 'helpers/seo';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import {
  Container,
  Images,
  Alert,
  SimilarBuildings,
  SimilarBuildingsHeader,
  SimilarBuildingsList
} from 'pages/Building/styles';

function Building({ property }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [ similarBuildings, setSimilarBuildings ] = useState([]);
  const [ data, setData ] = useState([]);

  useEffect(() => {
    const productSeals = [];

    if(property.label) {
      Object.keys(property.label).forEach(key => {
        if(property.label[key]) {
          productSeals.push(key);
        }
      })
    }

    CookieBuildingSeen.set(property.reference, user);

    dispatch(setMain({ currentBuilding: property }));

    async function loadSimilarBuildings() {
      const similar = await Api.Building.getSimilar(property, 3);
      const buildings =
        similar &&
        similar.data &&
        similar.data.length > 0 &&
        similar.data.filter(x => x.reference !== property.reference);

      setSimilarBuildings(buildings);
    }

    GTM.dataLayerPush({
      productId: property.reference,
      productValue: property.values.sell ? property.values.sell : property.values.rent,
      productType: property.type,
      productLocation: property.address.local,
      productSeals: productSeals.join('|'),
      productNumberOfBedrooms: property.infos.bedrooms,
      productParkingSpace: property.infos.parking,
      productArea: property.infos.areaUseful
    })

    loadSimilarBuildings();
    setData(property);
  }, [ property ]);

  useEffect(() => {
    return () => {
      dispatch(setMain({ currentBuilding: null }));
    }
  }, []);

  return data && Object.keys(data).length ? (
    <>
      <Head>
        <title>
          {data.category} {data.address.local} {data.address.state} com {(data.infos.areaUsefulStart) ? data.infos.areaUsefulStart : data.infos.areaBuilding}m² e {(data.infos.bedroomsStart) ? data.infos.bedroomsStart : data.infos.bedrooms } dormitórios {SeoData.shortTitle}
        </title>
        <meta name="description" content={`Venha conhecer este ${data.category} em ${data.address.local}, ${data.address.state}/${data.address.country} com ${(data.infos.areaUsefulStart) ? data.infos.areaUsefulStart : data.infos.areaBuilding}m², ${(data.infos.bedroomsStart) ? data.infos.bedroomsStart : data.infos.bedrooms } dormitórios e ${(data.infos.parkingStart) ? data.infos.parkingStart : data.infos.parking } vagas de garagem. O local ideal para quem é apaixonado por arquitetura e design!`} />
      </Head>
      <Container>
        <Headerbar
          type="building"
          title={data.category}
          subtitle={data.address.local}
          building={{
            reference: data.reference,
            source: data.source,
            likes: data.totalFavorites,
            local: data.address.local,
            area: data.infos.areaBuilding,
            bedrooms: data.infos.bedrooms,
            parking: data.infos.parking
          }}
        />

        {data.gallery && (
          <Images
            category={data.category}
            local={data.address.local}
            items={data.gallery}
            tour360={data.tour360}
            reference={data.reference}
          />
        )}

        <DataSheet property={data} />

        <Alert>
          <p>
            As informações acima, incluindo preço, áreas e valores,
            podem não ser exatas e devem ser confirmadas com o corretor.
          </p>

          <p>
            No caso de imóveis em lançamento, as imagens são meramente
            ilustrativas e os valores estão sujeitos a alterações de tabelas.
          </p>
        </Alert>

        {Object.keys(data.components).length > 0 && (
          <Modules property={data} />
        )}

        {similarBuildings && similarBuildings.length > 0 && (
          <SimilarBuildings>
            <SimilarBuildingsHeader>
              <h2>Pessoas que viram este imóvel também viram:</h2>
            </SimilarBuildingsHeader>
            <SimilarBuildingsList>
              {similarBuildings.map((building, buildingIndex) => (
                <BuildingList
                  layout="horizontal"
                  item={building}
                  page="building"
                  positionIndex={buildingIndex + 1}
                  key={`building-searchitem-${building.reference}-${buildingIndex}`}
                />
              ))}
            </SimilarBuildingsList>
          </SimilarBuildings>
        )}

        <BlockHighlighted type="notfound" />
        <Contact />
      </Container>
    </>
  ) : null;
}

Building.getInitialProps = async ({ query }) => {
  const slug = query.slug ? query.slug.split('-') : false;
  let reference = null;

  if(slug) {
    reference = slug[slug.length - 1];
  }

  const response = await Api.Building.getPage(reference);

  return {
    reference: reference,
    property: response.building
  };
};

export default Building;
