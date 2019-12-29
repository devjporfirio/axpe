import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Api from 'services';

// components
import Headerbar from 'components/Headerbar';
import BlockHighlighted from 'components/BlockHighlighted';
import Contact from 'components/Contact';
import SimilarBuilding from 'components/Building';
import DataSheet from 'pages/Building/Datasheet';
import Modules from 'pages/Building/modules';

// helpers
import User from 'helpers/user';
import SeoData from 'helpers/seo';

// styles
import { Container, Images, Alert, PanelSimilar } from 'pages/Building/styles';

function Building({ property }) {
  const [ similarBuildings, setSimilarBuildings ] = useState([]);

  useEffect(() => {
    User.setBuildingSeen(property);

    async function loadSimilarBuildings() {
      const similar = await Api.Building.getSimilar(property, 3);
      const buildings =
        similar &&
        similar.data &&
        similar.data.length > 0 &&
        similar.data.filter(x => x.reference !== property.reference);

      setSimilarBuildings(buildings);
    }

    loadSimilarBuildings();
  }, []);

  return property && Object.keys(property).length ? (
    <>
      <Head>
        <title>{SeoData.title}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        <Headerbar
          type="building"
          title={property.category}
          subtitle={property.address.local}
          building={{
            reference: property.reference,
            source: property.source,
            likes: 135
          }}
        />

        {property.gallery && (
          <Images
            category={property.category}
            local={property.address.local}
            items={property.gallery}
            tour360={property.tour360}
          />
        )}

        <DataSheet property={property} />

        <Alert>
          <p>
            Todas as informações aqui contidas, incluindo preço, metragem quadrada
            e valores são aproximadas e não garantidas, devendo ser confirmadas
            pessoalmente pelos interessados.
          </p>

          <p>
            No caso de imóveis em lançamento, as imagens são meramente
            ilustrativas e os valores estão sujeitos a alteração de tabela.
          </p>
        </Alert>

        {Object.keys(property.components).length > 0 && (
          <Modules property={property} />
        )}

        {similarBuildings && similarBuildings.length > 0 && (
          <PanelSimilar title="Pessoas que viram este imóvel também viram:">
            {similarBuildings.map(building => (
              <SimilarBuilding item={building} key={building.reference} />
            ))}
          </PanelSimilar>
        )}

        <BlockHighlighted type="notfound" />
        <Contact />
      </Container>
    </>
  ) : null;
}

Building.getInitialProps = async ({ query }) => {
  const reference = query.reference;
  const response = await Api.Building.getPage(reference);

  return {
    reference: query.reference,
    property: response.building
  };
};

export default Building;
