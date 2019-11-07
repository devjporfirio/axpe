import React, { useCallback, useEffect, useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import Api from 'services';
import { useRouter } from 'next/router'

// store
import { setMain } from 'store/modules/main/actions'

// components
import Button from 'components/Button';
import BlockHighlighted from 'components/BlockHighlighted';
import Building from 'components/Building';
import Contact from 'components/Contact';
import Share from 'components/Share';

// helpers
import useScrollPosition from 'helpers/scroll-position';
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
  const { query, query: { source, finality } } = router;
  const { searchFormActive } = useSelector(state => state.main);
  const refHeaderbar = useRef(null);
  const scrollPosition = useScrollPosition();

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

  const handleScrollPosition = ([ curTop, oldTop ]) => {
    const startTopHeaderbar = window.innerWidth < 768 ? 70 : 0;

    if(!refHeaderbar || !refHeaderbar.current) return false;

    if(!startTopHeaderbar) {
      refHeaderbar.current.style.top = `0px`;
      return false;
    }

    let topHeaderbar = curTop > oldTop ? startTopHeaderbar - curTop : startTopHeaderbar;

    if(topHeaderbar < 0) {
      topHeaderbar = 0;
    } else if(topHeaderbar > startTopHeaderbar) {
      topHeaderbar = startTopHeaderbar;
    }

    refHeaderbar.current.style.top = `${topHeaderbar}px`;
  };

  useEffect(() => {
    handleScrollPosition(scrollPosition);
  }, scrollPosition);

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

  const toggleShare = useCallback(() => {
    setShareActive(!shareActive)
  }, [ shareActive ]);

  const shareOnClose = useCallback(() => {
    setShareActive(!shareActive)
  }, [ shareActive ]);

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
    } else if(!dataLoaded) {
      dispatch(setMain({ headerHiding: true }));
      setNewData(data, true);
      setDataLoaded(true);
    }
  }, [ page, total ]);

  return (
    <Container>
      {dataLoaded ?
        <>
          {total ? (
            <Headerbar ref={refHeaderbar}>
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
