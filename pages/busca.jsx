import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import Api from 'services';

// components
import SimilarBuilding from 'components/SimilarBuilding';

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
  ButtonBack,
  Buildings,
  BuildingsNotFound
} from 'pages/Search/styles'

function Search({ data }) {
  const orderOptions = [
    { label: 'Mais Recentes', value: 'mais-recentes' },
    { label: 'Maior área útil', value: 'maior-area-util' },
    { label: 'Menor Preço', value: 'menor-preco' },
    { label: 'Maior Preço', value: 'maior-preco' }
  ]
  const [ orderBy, setOrderBy ] = useState(orderOptions[0].value);
  const orderBySelected = orderOptions.filter(orderItem => orderItem.value == orderBy);

  function handleOrderBy(event) {
    setOrderBy(event.target.value);
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
        {data.length ? (
          <h3>Encontramos <strong>{data.length} imóveis</strong> do jeitinho que pediu</h3>
         ) : null}
        <HeaderCombo>
          <button type="button">
            <strong>Ordenar por:</strong>
            {orderBySelected.length ? (
              <span>{orderBySelected[0].label}</span>
            ) : null}
          </button>
          <select name="orderBy" onChange={handleOrderBy} onBlur={handleOrderBy}>
            {orderOptions.map((orderItem, orderItemIndex) => (
              <option value={orderItem.value} key={`orderby-item-${orderItemIndex}`}>{orderItem.label}</option>
            ))}
          </select>
        </HeaderCombo>
      </Header>
      <Wrapper>
        <ButtonBack type="button">
          <SVG src={ArrowIconSVG} uniquifyIDs={true} />
        </ButtonBack>
        <Buildings>
          {data.length ? data.map(building => (
              <SimilarBuilding item={building} key={building.reference} />
            )): <BuildingsNotFound>
              <p>Nenhum imóvel encontrado =(</p>
            </BuildingsNotFound> }
        </Buildings>
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
