import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import Api from 'services';
import { useRouter } from 'next/router'

// store
import { setMain } from 'store/modules/main/actions'

// components
import Button from 'components/Button';
import Headerbar from 'components/Headerbar';
import BlockHighlighted from 'components/BlockHighlighted';
import Building from 'components/Building';
import Contact from 'components/Contact';

// helpers
import { getParamsFromObject } from 'helpers/utils'

// assets
import ArrowIconSVG from 'assets/icons/arrow';

// styles
import {
  Container,
  Header,
  HeaderCombo,
  Wrapper,
  ButtonBack,
  Buildings,
  BuildingsNotFound,
  BuildingsLoadMore
} from 'pages/Search/styles'

function Search({ currentPage, total, totalPages, data }) {
  const router = useRouter();
  const { query, query: { source, finality } } = router;
  const dispatch = useDispatch();
  const { searchFormActive } = useSelector(state => state.main);

  const orderOptions = [
    { label: 'Mais Recentes', value: 'mais-recentes' },
    { label: 'Maior área útil', value: 'maior-area-util' },
    { label: 'Menor Preço', value: 'menor-preco' },
    { label: 'Maior Preço', value: 'maior-preco' }
  ];

  const [ orderBy, setOrderBy ] = useState(orderOptions[0].value);
  const [ page, setPage ] = useState(+query.page || 1);
  const [ buildings, setBuildings ] = useState(null);
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const orderBySelected = orderOptions.filter(orderItem => orderItem.value == orderBy);

  const getSourceText = useCallback(() => {
    switch(source) {
      case 'sao-paulo':
        return 'São Paulo';
      default:
        return source;
    }
  }, [ source ])

  const getFinalityText = useCallback(() => {
    switch(finality) {
      case 'venda':
        return 'comprar';
      case 'aluguel':
        return 'alugar';
      default:
        return finality;
    }
  }, [ finality ]);

  const toggleSearch = useCallback(() => {
    dispatch(setMain({ searchFormActive: !searchFormActive }))
  }, [ searchFormActive ]);

  const handleOrderBy = (event) => {
    setOrderBy(event.target.value);
  }

  const setNewData = useCallback((newData, first) => {
    const newBuildings = buildings && buildings.length && !first ? [ ...buildings, ...newData ] : [ ...newData ];
    setBuildings(newBuildings);
    setIsLoading(false);
  }, [ buildings ]);

  const loadMore = useCallback(() => {
    setPage(page + 1);
  }, [ page ])

  useEffect(() => {
    const getDataByPage = async () => {
      const params = getParamsFromObject({
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
      setNewData(data, true);

      if(!dataLoaded) {
        setDataLoaded(true);
      }
    }
  }, [ page, total ]);

  return (
    <Container>
      {dataLoaded ?
        <>
          {total ? (
            <Headerbar
              type="search"
              title={source && getSourceText()}
              subtitle={finality && `Imóveis para ${getFinalityText()}`}
            />
          ) : null}

          <Wrapper>
            {total ? (
              <Header>
                <h3>Encontramos <strong>{total} imóveis</strong> do jeitinho que pediu</h3>
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
            ) : null}

            {total ? (
              <ButtonBack type="button" onClick={toggleSearch}>
                <SVG src={ArrowIconSVG} uniquifyIDs={true} />
              </ButtonBack>
            ) : null}

            <Buildings>
              {total ? buildings.map((building, buildingIndex) => (
                  <Building item={building} key={`building-searchitem-${building.reference}-${buildingIndex}`} />
                )) : (
                <BuildingsNotFound>
                  <h6>Não encontramos o imóvel que você procura <span>:(</span></h6>
                  <p>Tente fazer uma <button type="button" onClick={toggleSearch}>nova busca!</button></p>
                </BuildingsNotFound>
              )}

              {total && page < totalPages ? (
                <BuildingsLoadMore>
                  <Button type="button" onClick={loadMore} disabled={isLoading}>
                    {isLoading ? 'Carregando...' : 'Carregar mais'}
                  </Button>
                </BuildingsLoadMore>
              ) : null}
            </Buildings>
          </Wrapper>

          <BlockHighlighted type="notfound" />
          <Contact />
        </>
      : null}
    </Container>
  )
}

Search.getInitialProps = async ({ query }) => {
  const params = getParamsFromObject(query, true);
  const response = await Api.Search.getBuildings(params);
  return response;
}

export default Search;
