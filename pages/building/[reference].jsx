import React, { useEffect } from 'react';
import Api from 'services';
import BlockHighlighted from 'components/BlockHighlighted';
import Contact from 'components/Contact';
import SimilarBuilding from 'components/SimilarBuilding';
import DataSheet from 'pages/Building/Datasheet';
import Modules from 'pages/Building/modules';

import User from 'helpers/User';

import { Container, Header, Images, Alert, PanelSimilar } from 'pages/Building/styles';

function Building({ property, similarBuildings }) {
  useEffect(() => {
    User.setBuildingSeen(property);
  });

  if (!property || !Object.keys(property).length > 0) {
    return <h1>Loading..</h1>;
  }

  return (
    <Container>
      <Header
        category={property.category}
        local={property.address.local}
        source={property.source}
        reference={property.reference}
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
        <Modules modules={property.components} />
      )}

      {property.type === 'lancamento' &&
        similarBuildings &&
        similarBuildings.length > 0 && (
          <PanelSimilar title="Pessoas que viram este imóvel também viram:">
            {similarBuildings.map(building => (
              <SimilarBuilding item={building} key={building.reference} />
            ))}
          </PanelSimilar>
        )}

      <BlockHighlighted type="notfound" />
      <Contact />
    </Container>
  );
}

Building.getInitialProps = async ({ query }) => {
  const reference = query.reference;
  const response = await Api.Building.getPage(reference);
  const similar = await Api.Building.getSimilar(response.building, 3);
  const buildings =
    similar &&
    similar.buildings &&
    similar.buildings.length > 0 &&
    similar.buildings.filter(x => x.reference !== reference);
  return {
    reference: query.reference,
    property: response.building,
    similarBuildings: buildings
  };
};

export default Building;
