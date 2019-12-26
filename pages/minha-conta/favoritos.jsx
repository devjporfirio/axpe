import React from 'react';
import Api from 'services';

// components
import Building from 'components/Building';

// styles
import { Container } from 'pages/MyAccount/Favorites/styles';

function Favorites({ buildings }) {
  return (
    <Container>
      {buildings &&
        buildings.length > 0 &&
        buildings.map(building => (
          <Building item={building} key={building.reference} />
        ))}
    </Container>
  );
}

Favorites.getInitialProps = async ({}) => {
  const buildings = await Api.MyAccount.getFavorites();
  return {
    buildings
  };
};

export default Favorites;
