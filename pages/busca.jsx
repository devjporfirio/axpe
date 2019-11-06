import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import Api from 'services';
import { useRouter } from 'next/router'

// store
import { setSearch } from 'store/modules/search/actions'

// components
import Button from 'components/Button';
import BlockHighlighted from 'components/BlockHighlighted';
import Contact from 'components/Contact';
import SimilarBuilding from 'components/SimilarBuilding';
import Share from 'components/Share';

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

function Search({ dispatch, currentPage, total, totalPages, data }) {
  const router = useRouter();
  const search = useSelector(state => state.search);
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
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ shareActive, setShareActive ] = useState(false);
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

  function toggleSearch() {
    dispatch(setSearch({ active: !search.active }))
  }

  function toggleShare() {
    setShareActive(!shareActive)
  }

  function shareOnClose() {
    setShareActive(!shareActive)
  }

  function handleOrderBy(event) {
    setOrderBy(event.target.value);
  }

  function setNewData(newData, first) {
    const newBuildings = buildings && buildings.length && !first ? [ ...buildings, ...newData ] : [ ...newData ];
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
      setNewData(data, true);
    }

    setDataLoaded(true);
  }, [ page, total ]);

  return (
    <Container>
      {dataLoaded ?
        <>
          {total ? (
            <Headerbar>
              <HeaderbarBackButton type="button" onClick={toggleSearch}>Voltar</HeaderbarBackButton>

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
                <HeaderbarButton type="button" onClick={toggleShare}>
                  <SVG src={ShareIconSVG} uniquifyIDs={true} />
                </HeaderbarButton>
                <HeaderbarContactButton>Fale conosco</HeaderbarContactButton>
              </div>
            </Headerbar>
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
                  <SimilarBuilding item={building} key={`building-searchitem-${building.reference}-${buildingIndex}`} />
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

      <Share active={shareActive} path={router.asPath} title={`Axpe - Resultado de Busca`} onClose={shareOnClose} />
    </Container>
  )
}

Search.getInitialProps = async ({ query }) => {
  const params = getUrl(query, true);
  const response = await Api.Search.getBuildings(params);
  return response;
}

export default connect()(Search);
