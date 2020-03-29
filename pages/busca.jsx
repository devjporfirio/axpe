import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import SVG from 'react-inlinesvg';
import Api from 'services';
import Router, { useRouter } from 'next/router';

// store
import { setMain } from 'store/modules/main/actions';

// components
import Button from 'components/Button';
import Headerbar from 'components/Headerbar';
import BlockHighlighted from 'components/BlockHighlighted';
import BuildingList from 'components/Building/List';
import Contact from 'components/Contact';
import BuildingsPanel from 'components/BuildingsPanel';

// helpers
import { getParamsFromObject } from 'helpers/utils'
import SeoData from 'helpers/seo';

// assets
import ArrowIconSVG from 'assets/icons/arrow';

// styles
import {
  Container,
  Header,
  HeaderOrder,
  HeaderOrderButton,
  HeaderOrderSelect,
  HeaderOrderList,
  HeaderOrderListButton,
  Wrapper,
  ButtonBack,
  Buildings,
  BuildingsNotFound,
  BuildingsLoadMore
} from 'pages/Search/styles'

function Search({ total, totalPages, data, locals }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query, query: { source, finality, reference, order } } = router;
  const { searchFormActive } = useSelector(state => state.main);

  const orderOptions = [
    { label: 'Mais Recentes', value: 'latest' },
    { label: 'Menor área útil', value: 'lowest_area' },
    { label: 'Maior área útil', value: 'biggest_area' },
    { label: 'Menor Preço', value: 'lowest_price' },
    { label: 'Maior Preço', value: 'biggest_price' }
  ];

  const orderTiming = useRef(false);
  const [ orderByComboActive, setOrderByComboActive ] = useState(false);
  const [ orderBy, setOrderBy ] = useState(order ? order : orderOptions[0].value);
  const [ page, setPage ] = useState(+query.page || 1);
  const [ buildings, setBuildings ] = useState(null);
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ suggestions, setSuggestions ] = useState(null);

  const getOrderBySelected = useCallback(() => {
    return orderOptions.filter(orderItem => orderItem.value == orderBy);
  }, [ orderBy ]);

  const getSourceText = useCallback(() => {
    if(source && source === 'sao-paulo') {
      return 'São Paulo';
    }
    return source;
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

  const handleOrderBy = useCallback((newOrder) => {
    const params = getParamsFromObject({
      ...query,
      order: newOrder
    });

    if(query.order !== newOrder) {
      setOrderBy(newOrder);
      Router.push(`/busca${params}`);
    }
  }, [ query ]);

  const setNewData = useCallback((newData, first) => {
    const newBuildings = buildings && buildings.length && !first ? [ ...buildings, ...newData ] : [ ...newData ];
    setBuildings(newBuildings);
    setIsLoading(false);
  }, [ buildings ]);

  const loadMore = useCallback(() => {
    setPage(page + 1);
  }, [ page ]);

  const getBuildingsSuggestions = useCallback(async () => {
    const results = [];

    const getBuildingsSuggestion = async (title, newQuery) => {
      const params = getParamsFromObject(newQuery);
      const response = await Api.Search.getBuildings(params);

      if(response.data && response.data.length) {
        results.push({
          title: title.replace('{{showTotal}}', getTotalFormated(response.total)),
          items: response.data
        });
      }
    }

    const getTotalFormated = total => {
      total = total > 10 ? 10 : total;

      const text = total > 1 ? `opções` : `opção`;
      let result = `${total} ${text}`;

      if(total < 10) {
        result = `0${total} ${text}`;
      }

      return result;
    }

    if(query.price_start && query.price_end && !reference) {
      const priceEnd = +query.price_end;
      const percent = priceEnd * 20 / 100;
      const newPriceStart = priceEnd + 1;
      const newPriceEnd = priceEnd + percent;

      await getBuildingsSuggestion(`Encontramos mais <strong>{{showTotal}}</strong>, mas o valor passou um pouco. Pode ser?`, {
        ...query,
        price_start: newPriceStart,
        price_end: newPriceEnd
      });
    }

    if(query.source && query.local && locals && !reference) {
      const localsArr = query.local.split(',');

      let localsSelected = [];

      Object.keys(locals).forEach(local => {
        locals[local].forEach(item => {
          if(localsArr.indexOf(item.local) >= 0 && item.related && item.related.length) {
            localsSelected = [ ...localsSelected, ...item.related ];
          }
        })
      });

      if(localsSelected.length) {
        const query2 = {
          ...query,
          local: localsSelected.join(',')
        };
        await getBuildingsSuggestion(`Encontramos mais <strong>{{showTotal}}</strong> do jeito que você quer, mas em bairros vizinhos, tudo bem?`, query2);
      }
    }

    if(query.source &&
      query.finality &&
      query.use &&
      query.ready_release &&
      query.source === 'sao-paulo' &&
      query.finality === 'venda' &&
      query.use === 'RESIDENCIAL' &&
      !reference) {
        const finalText = query.ready_release === 'pronto' ? 'mas não estão prontos. Pode esperar?' : 'mas pronto para morar';
        const query2 = query.ready_release === 'pronto' ? {
          ...query,
          ready_release: 'lancamento'
        } : {
          ...query,
          ready_release: 'pronto'
        };
        await getBuildingsSuggestion(`Encontramos mais <strong>{{showTotal}}</strong> do jeito que você quer, ${finalText}`, query2);
      }

    setSuggestions(results);
  }, [ total, reference ]);


  useEffect(() => {
    dispatch(setMain({
      searchFunnel: {
        finality: query.finality,
      }
    }))
  }, [ query.finality ]);

  useEffect(() => {
    setNewData(data, true);
    setPage(1);
    getBuildingsSuggestions();

    if(!dataLoaded) {
      setDataLoaded(true);
    }
  }, [ total, order, reference ]);

  useEffect(() => {
    const getDataByPage = async () => {
      const params = getParamsFromObject({
        ...query,
        page: page
      });
      const response = await Api.Search.getBuildings(params);

      setNewData(response.data);
    }

    if(page > 1) {
      setIsLoading(true);
      getDataByPage();
    }
  }, [ page ]);

  return (
    <>
      <Head>
        <title>{`Busca - ${SeoData.title}`}</title>
      </Head>
      <Container>
        {dataLoaded ?
          <>
            {total ? (
              <Headerbar
                type="search"
                title={source && !reference && getSourceText()}
                subtitle={finality && !reference && `Imóveis para ${getFinalityText()}`}
              />
            ) : null}

            <Wrapper>
              {total ? (
                <Header>
                  <h3>Encontramos <strong>{total} imóveis</strong> para sua busca</h3>
                  <HeaderOrder
                    onMouseEnter={() => clearTimeout(orderTiming.current)}
                    onMouseLeave={() => {
                      orderTiming.current = setTimeout(() => {
                        setOrderByComboActive(false)
                      }, 300)
                    }}
                  >
                    <HeaderOrderButton
                      type="button"
                      active={orderByComboActive}
                      onClick={() => setOrderByComboActive(!orderByComboActive)}
                    >
                      <strong>Ordenar por:</strong>
                      {getOrderBySelected().length ? (
                        <span>{getOrderBySelected()[0].label}</span>
                      ) : null}
                    </HeaderOrderButton>
                    <HeaderOrderSelect
                      name="orderBy"
                      value={orderBy}
                      onChange={(event) => handleOrderBy(event.target.value)}
                      onBlur={(event) => handleOrderBy(event.target.value)}
                    >
                      {orderOptions.map((orderItem, orderItemIndex) => (
                        <option value={orderItem.value} key={`orderby-item-${orderItemIndex}`}>{orderItem.label}</option>
                      ))}
                    </HeaderOrderSelect>
                    <HeaderOrderList active={orderByComboActive}>
                      {orderOptions.map((orderItem, orderItemIndex) => (
                        <HeaderOrderListButton
                          type="button"
                          key={`orderby-listitem-${orderItemIndex}`}
                          onClick={() => {
                            setOrderBy(orderItem.value);
                            handleOrderBy(orderItem.value);
                          }}
                        >
                          {orderItem.label}
                        </HeaderOrderListButton>
                      ))}
                    </HeaderOrderList>
                  </HeaderOrder>
                </Header>
              ) : null}

              {total ? (
                <ButtonBack type="button" onClick={toggleSearch}>
                  <SVG src={ArrowIconSVG} uniquifyIDs={true} />
                </ButtonBack>
              ) : null}

              <Buildings>
                {total ? buildings.map((building, buildingIndex) => (
                    <BuildingList item={building} key={`building-searchitem-${building.reference}-${buildingIndex}`} />
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

            {suggestions && suggestions.length > 0 && suggestions.map((suggestion, index) => (
              <BuildingsPanel
                key={`suggestion-${index}`}
                headerBig={true}
                title={suggestion.title}
                buildingLayout="vertical"
                data={suggestion.items}
              />
            ))}

            <BlockHighlighted type="notfound" query={query} />
            <Contact />
          </>
        : null}
      </Container>
    </>
  )
}

Search.getInitialProps = async ({ query }) => {
  const params = getParamsFromObject(query, true);
  const locals = await Api.Search.getLocals();
  const response = await Api.Search.getBuildings(params);

  return {
    ...response,
    locals
  };
}

export default Search;
