import React from 'react';
import Api from 'services';

import Slides from 'pages/MyAccount/Views/Slides';

// styles
import { Container } from 'pages/MyAccount/Views/styles';

function Views({ viewed }) {
  return (
    <Container>
      <Slides items={viewed} />

      <hr />

      <Slides items={viewed} />
    </Container>
  );
}

Views.getInitialProps = async ({}) => {
  const buildingViewed = await Api.MyAccount.getViewed();
  return {
    viewed: buildingViewed
  };
};

export default Views;
