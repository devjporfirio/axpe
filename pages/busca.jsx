import React from 'react';
import SVG from 'react-inlinesvg';
import Api from 'services';

// helpers
import { getUrl } from 'helpers/utils'

// assets
import ArrowIconSVG from 'assets/icons/arrow';
import AlertIconSVG from 'assets/icons/alert';
import ShareIconSVG from 'assets/icons/share';

// styles
import {
  Container,
  Headerbar,
  HeaderbarBackButton,
  HeaderbarButton,
  HeaderbarContactButton,
  Header,
  HeaderCombo,
  Wrapper,
  ButtonBack
} from 'pages/Search/styles'

function Search({ buildings }) {
  function handleOrderBy() {

  }

  return (
    <Container>
      <Headerbar>
        <HeaderbarBackButton type="button">Voltar</HeaderbarBackButton>
        <h2>São Paulo</h2>
        <h3>Móveis para alugar</h3>
        <div>
          <HeaderbarButton type="button">
            <SVG src={AlertIconSVG} uniquifyIDs={true} />
          </HeaderbarButton>
          <HeaderbarButton type="button">
            <SVG src={ShareIconSVG} uniquifyIDs={true} />
          </HeaderbarButton>
          <HeaderbarContactButton>Fale conosco</HeaderbarContactButton>
        </div>
      </Headerbar>
      <Header>
        <h3>Encontramos <strong>04 imóveis</strong> do jeitinho que pediu</h3>
        <HeaderCombo>
          <button type="button"><strong>Ordenar por:</strong> <span>Mais recentes</span></button>
          <select name="orderBy" handleChange={handleOrderBy}>
            <option value="Mais Recentes">Mais Recentes</option>
            <option value="Maior área útil">Maior área útil</option>
            <option value="Menor Preço">Menor Preço</option>
            <option value="Maior Preço">Maior Preço</option>
          </select>
        </HeaderCombo>
      </Header>
      <Wrapper>
        <ButtonBack type="button">
          <SVG src={ArrowIconSVG} uniquifyIDs={true} />
        </ButtonBack>
        {JSON.stringify(buildings)}
      </Wrapper>
    </Container>
  )
}

Search.getInitialProps = async ({ query }) => {
  const params = getUrl(query, true);
  const response = await Api.Search.getBuildings(params);
  return response;
}

export default Search;
