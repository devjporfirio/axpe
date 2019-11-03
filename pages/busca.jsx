import React from 'react';
import Api from 'services';

// helpers
import { getUrl } from 'helpers/utils'

// styles
import { Container } from 'pages/Search/styles'

function Search({ buildings }) {
  return (
    <Container>
      pagina de busca
      {JSON.stringify(buildings)}
    </Container>
  )
}

Search.getInitialProps = async ({ query }) => {
  const params = getUrl(query);
  const response = await Api.Search.getBuildings(params);
  return response;
}

export default Search;
