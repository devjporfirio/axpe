import React from 'react';
import Api from 'services';

// components
// import Empty from 'pages/MyAccount/Empty';

// styles
// import { Amount, BuildingItem } from 'pages/MyAccount/Favorites/styles';
import { Container } from 'pages/Favorites/styles';
// import { Title } from 'pages/MyAccount/styles';

function Favoritos({ buildings, name }) {
  return !buildings || buildings.length <= 0 ? (
    <Container>
      <Empty
        title="Você ainda não tem nenhum imóvel favorito"
        subtitle="Para favoritar um imóvel, faça uma busca e clique nos ícones de coração em cada imóvel."
      />
    </Container>
  ) : (
    <Container>
      <Amount>
        <Title>
          Favoritos de <strong>{name}</strong>
        </Title>
      </Amount>
      {buildings &&
        buildings.length > 0 &&
        buildings.map((building, buildingIndex) => (
          <BuildingItem
            item={building}
            key={`building-${buildingIndex}-${building.reference}`}
          />
        ))}
    </Container>
  );
}

Favoritos.getInitialProps = async ({ query }) => {
  const hash = query.hash;
  const response = await Api.Building.getFavoritesShare(hash);

  return {
    buildings: response.buildings,
    name: response.name
  };
};

export default Favoritos;
