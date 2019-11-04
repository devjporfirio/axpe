import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import Api from 'services';
import { useRouter } from 'next/router'

// components
import Button from 'components/Button';
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
  BuildingsNotFound,
  BuildingsLoadMore
} from 'pages/Search/styles'

function Search({ currentPage, perPage, totalPages, data }) {
  const router = useRouter()
  const { query, query: { source, finality } } = router;

  const orderOptions = [
    { label: 'Mais Recentes', value: 'mais-recentes' },
    { label: 'Maior área útil', value: 'maior-area-util' },
    { label: 'Menor Preço', value: 'menor-preco' },
    { label: 'Maior Preço', value: 'maior-preco' }
  ];

  const [ orderBy, setOrderBy ] = useState(orderOptions[0].value);
  const [ page, setPage ] = useState(+query.page || 1);
  const [ buildings, setBuildings ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const orderBySelected = orderOptions.filter(orderItem => orderItem.value == orderBy);

  function getSourceText() {
    switch(source) {
      case 'sao-paulo':
        return 'São Paulo';
      default:
        return source;
    }
  }

  function getFinalityText() {
    switch(finality) {
      case 'venda':
        return 'comprar';
      case 'aluguel':
        return 'alugar';
      default:
        return finality;
    }
  }

  function handleOrderBy(event) {
    setOrderBy(event.target.value);
  }

  function setNewData(newData) {
    const newBuildings = buildings && buildings.length ? [ ...buildings, ...newData ] : [ ...newData ];
    setBuildings(newBuildings);
    setIsLoading(false);
  }

  function loadMore() {
    setPage(page + 1);
  }

  useEffect(() => {
    const getDataByPage = async () => {
      const params = getUrl({
        ...query,
        page: page
      });
      const response = await Api.Search.getBuildings(params);

      setNewData(response.data);
    }

    if(currentPage !== page) {
      setIsLoading(true);
      getDataByPage();
    } else {
      setNewData(data);
    }

  }, [ page ]);

  return (
    <Container>
      <Headerbar>
        <HeaderbarBackButton type="button">Voltar</HeaderbarBackButton>

        {source && (
          <h2>{getSourceText()}</h2>
        )}

        {finality && (
          <h3>Imóveis para {getFinalityText()}</h3>
        )}

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

      {buildings ?
        <>
          <Header>
            {buildings.length ? (
              <h3>Encontramos <strong>{buildings.length} imóveis</strong> do jeitinho que pediu</h3>
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
              {buildings.length ? buildings.map((building, buildingIndex) => (
                  <SimilarBuilding item={building} key={`building-searchitem-${building.reference}-${buildingIndex}`} />
                )) : (
                <BuildingsNotFound>
                  <p>Nenhum imóvel encontrado =(</p>
                </BuildingsNotFound>
              )}

              {buildings.length && page < totalPages ? (
                <BuildingsLoadMore>
                  <Button type="button" color="orange" onClick={loadMore} disabled={isLoading}>
                    {isLoading ? 'Carregando...' : 'Carregar mais'}
                  </Button>
                </BuildingsLoadMore>
              ) : null}
            </Buildings>
          </Wrapper>
        </>
      : null}
    </Container>
  )
}

Search.getInitialProps = async ({ query }) => {
  const params = getUrl(query, true);
  const response = await Api.Search.getBuildings(params);
  return {
    ...response,
    teste: 2,
    currentPage: parseInt(response.current_page),
    totalPages: response.total_pages,
    perPage: parseInt(response.per_page) };
}

export default Search;
