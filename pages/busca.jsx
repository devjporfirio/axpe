import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import SVG from "react-inlinesvg";
import Api from "services";
import Router, { useRouter } from "next/router";
import GTM from "helpers/gtm";
import { setMain } from "store/modules/main/actions";
import Button from "components/Button";
import Headerbar from "components/Headerbar";
import BlockHighlighted from "components/BlockHighlighted";
import BuildingList from "components/Building/List";
import NewsletterFooter from "components/NewsletterFooter";
import NewContactSection from "components/NewContactSection";
import BuildingsPanel from "components/BuildingsPanel";
import CustomSelect from "components/CustomSelect";
import OrderFilterDropdown from "components/OrderFilterDropdown";
import OptimizedBuildingImage from "components/OptimizedImage";
import { getParamsFromObject } from "helpers/utils";
import ArrowIconSVG from "assets/icons/arrow.svg";
import IOrderBlockOn from "assets/icons/order-block-active.svg";
import IOrderRowOn from "assets/icons/order-row-active.svg";
import IOrderBlockOff from "assets/icons/order-block-off.svg";
import IOrderRowOff from "assets/icons/order-row-off.svg";
import {
  Container,
  Header,
  HeaderOrder,
  Wrapper,
  ButtonBack,
  Buildings,
  BuildingsNotFound,
  SearchBanner,
  Infos,
  ImageContainer,
  BuildingsLoadMore,
  DisplayOrder,
} from "pages/Search/styles";

function Search({ total, totalPages, data, banner, locals }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    query = {},
    query: {
      source,
      finality,
      reference,
      order: queryOrder,
    } = {},
  } = router;

  const SESSION_STORAGE_KEY = "scrollPositionBusca";
  const ITEMS_PER_PAGE = 10;
  const DEFAULT_ORDER = "";

  const { searchFormActive } = useSelector((state) => state.main);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.axpe.com.br";

  const normalizedOrder = Array.isArray(queryOrder)
    ? queryOrder[0]
    : queryOrder;

  const currentOrder =
    normalizedOrder && typeof normalizedOrder === "string"
      ? normalizedOrder
      : DEFAULT_ORDER;

  const canonicalPath = (() => {
    const url = new URLSearchParams(query);
    const canonicalParams = new URLSearchParams();

    for (const [key, value] of url.entries()) {
      if (key !== "page") {
        canonicalParams.append(key, value);
      }
    }

    return `${baseUrl}/busca${
      canonicalParams.toString()
        ? "?" + canonicalParams.toString()
        : ""
    }`;
  })();

  const keysToHumanNames = {
    source: "Localização",
    finality: "Para",
    use: "Tipo",
    ready_release: "",
    furnished: "Mobiliado",
    types: "Tipo do imóvel",
    local: "Bairros/Cidades",
    price_start: "Preço inicial",
    price_end: "Preço final",
    area_start: "Area inicial",
    area_end: "Area final",
    bedroom_start: "Quartos inicial",
    bedroom_end: "Quartos final",
    parking_start: "Número de vagas no estacionamento inicial",
    parking_end: "Número de vagas no estacionamento final",
    reference: "Referência",
    order: "Ordernar por",
  };

  const orderOptions = [
    { label: "Mais Recentes", value: "latest" },
    { label: "Menor Área útil", value: "lowest_area" },
    { label: "Maior Área útil", value: "biggest_area" },
    { label: "Menor Preço", value: "lowest_price" },
    { label: "Maior Preço", value: "biggest_price" },
  ];

  const finalityOptions = [
    { value: "venda", label: "Comprar" },
    { value: "aluguel", label: "Alugar" },
  ];

  const [loadNewPage, setLoadNewPage] = useState(false);
  const [orderBy, setOrderBy] = useState(currentOrder);
  const [page, setPage] = useState(Number(query.page) || 1);
  const [buildings, setBuildings] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [isOrderListActive, setIsOrderListActive] = useState(true);

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }

    const handleRouteChangeStart = () => {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        window.scrollY.toString()
      );
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router.events]);

  useEffect(() => {
    setOrderBy(currentOrder);
  }, [currentOrder]);

  const setDataInitialGTM = useCallback(() => {
    GTM.dataLayerPush({
      event: "view_search_page",
      searchFilters: Object.keys(query)
        .map((key) => {
          let value = query[key];

          if (key === "ready_release") {
            if (query[key] === "pronto") {
              return "Pronto para morar";
            }

            return "Lançamento";
          }

          if (key === "source") {
            if (value === "sao-paulo") {
              value = "São Paulo";
            } else if (value) {
              value = value[0].toUpperCase() + value.slice(1);
            }
          }

          if (key === "order") {
            const normalizedValue = Array.isArray(value)
              ? value[0]
              : value;

            const result = orderOptions.find(
              (item) => item.value === normalizedValue
            );

            value = result ? result.label : DEFAULT_ORDER;
          }

          return `${keysToHumanNames[key]}: ${value}`;
        })
        .join(" | "),
    });
  }, [query]);

  const getSourceText = useCallback(() => {
    if (source === "sao-paulo") {
      return "São Paulo";
    }

    return source;
  }, [source]);

  const getFinalityText = useCallback(() => {
    switch (finality) {
      case "venda":
        return "comprar";
      case "aluguel":
        return "alugar";
      default:
        return finality;
    }
  }, [finality]);

  const toggleSearch = useCallback(() => {
    dispatch(
      setMain({
        searchFormActive: !searchFormActive,
      })
    );
  }, [dispatch, searchFormActive]);

  const handleOrderBy = useCallback(
    (newOrder) => {
      const validOrder = orderOptions.some(
        (item) => item.value === newOrder
      )
        ? newOrder
        : DEFAULT_ORDER;

      if (currentOrder === validOrder) {
        return;
      }

      setIsLoading(true);
      setPage(1);
      setOrderBy(validOrder);

      const params = getParamsFromObject({
        ...query,
        order: validOrder,
        page: 1,
        limit: ITEMS_PER_PAGE,
      });

      Router.push(`/busca${params}`);
    },
    [query, currentOrder]
  );

  const setNewData = useCallback((newData, first = false) => {
    setBuildings((currentBuildings) => {
      if (!newData || !newData.length) {
        return first ? [] : currentBuildings || [];
      }

      if (
        first ||
        !currentBuildings ||
        !currentBuildings.length
      ) {
        return [...newData];
      }

      return [...currentBuildings, ...newData];
    });

    setIsLoading(false);
  }, []);

  const loadMore = useCallback(() => {
    if (isLoading || page >= totalPages) {
      return;
    }

    const newPage = page + 1;

    setIsLoading(true);
    setPage(newPage);
    setLoadNewPage(true);

    const params = getParamsFromObject({
      ...query,
      page: newPage,
      limit: ITEMS_PER_PAGE,
      order: currentOrder,
    });

    router.push(`/busca${params}`, undefined, {
      shallow: true,
    });
  }, [
    isLoading,
    page,
    totalPages,
    query,
    router,
    currentOrder,
  ]);

  const getBuildingsSuggestions = useCallback(async () => {
    const results = [];

    const getTotalFormated = (total) => {
      total = total > 10 ? 10 : total;

      const text = total > 1 ? "opções" : "opção";

      let result = `${total} ${text}`;

      if (total < 10) {
        result = `0${total} ${text}`;
      }

      return result;
    };

    const getBuildingsSuggestion = async (title, newQuery) => {
      const suggestionOrder =
        Array.isArray(newQuery.order)
          ? newQuery.order[0]
          : newQuery.order;

      const params = getParamsFromObject({
        ...newQuery,
        page: 1,
        limit: ITEMS_PER_PAGE,
        order: suggestionOrder || DEFAULT_ORDER,
      });

      const response = await Api.Search.getBuildings(params);

      if (response.data && response.data.length) {
        results.push({
          title: title.replace(
            "{{showTotal}}",
            getTotalFormated(response.total)
          ),
          items: response.data,
        });
      }
    };

    if (
      query.price_start &&
      query.price_end &&
      !reference
    ) {
      const priceEnd = Number(query.price_end);
      const percent = (priceEnd * 20) / 100;
      const newPriceStart = priceEnd + 1;
      const newPriceEnd = priceEnd + percent;

      await getBuildingsSuggestion(
        `Encontramos mais <strong>{{showTotal}}</strong>, mas o valor passou um pouco. Pode ser?`,
        {
          ...query,
          price_start: newPriceStart,
          price_end: newPriceEnd,
        }
      );
    }

    if (
      query.source &&
      query.local &&
      locals &&
      !reference
    ) {
      const localsArr = query.local.split(",");
      let localsSelected = [];

      Object.keys(locals).forEach((local) => {
        locals[local].forEach((item) => {
          if (
            localsArr.indexOf(item.local) >= 0 &&
            item.related &&
            item.related.length
          ) {
            localsSelected = [
              ...localsSelected,
              ...item.related,
            ];
          }
        });
      });

      localsSelected = localsSelected.filter(
        (local) => !localsArr.includes(local)
      );

      if (localsSelected.length) {
        await getBuildingsSuggestion(
          `Encontramos mais <strong>{{showTotal}}</strong> do jeito que você quer, mas em localizações próximas, tudo bem?`,
          {
            ...query,
            local: localsSelected.join(","),
          }
        );
      }
    }

    if (
      query.source &&
      query.finality &&
      query.use &&
      query.ready_release &&
      query.source === "sao-paulo" &&
      query.finality === "venda" &&
      query.use === "RESIDENCIAL" &&
      !reference
    ) {
      const finalText =
        query.ready_release === "pronto"
          ? "mas não estão prontos. Pode esperar?"
          : "mas pronto para morar";

      const query2 =
        query.ready_release === "pronto"
          ? {
              ...query,
              ready_release: "lancamento",
            }
          : {
              ...query,
              ready_release: "pronto",
            };

      await getBuildingsSuggestion(
        `Encontramos mais <strong>{{showTotal}}</strong> do jeito que você quer, ${finalText}`,
        query2
      );
    }

    setSuggestions(results);
  }, [query, locals, reference]);

  const handleFinalityChange = (newFinality) => {
    const newQuery = {
      ...router.query,
      finality: newFinality,
      page: 1,
      limit: ITEMS_PER_PAGE,
      order: currentOrder,
    };

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  useEffect(() => {
    setDataInitialGTM();
  }, [setDataInitialGTM]);

  useEffect(() => {
    if (query.finality) {
      sessionStorage.setItem(
        "search_finality",
        query.finality
      );
    }

    dispatch(
      setMain({
        searchFunnel: {
          finality: query.finality,
        },
      })
    );
  }, [dispatch, query.finality]);

  useEffect(() => {
    if (!loadNewPage) {
      setNewData(data, true);
      setPage(Number(query.page) || 1);
      getBuildingsSuggestions();

      if (!dataLoaded) {
        setDataLoaded(true);
      }
    }
  }, [
    data,
    total,
    currentOrder,
    reference,
    loadNewPage,
    dataLoaded,
    getBuildingsSuggestions,
    query.page,
    setNewData,
  ]);

  useEffect(() => {
    const getDataByPage = async () => {
      try {
        const params = getParamsFromObject({
          ...query,
          page,
          limit: ITEMS_PER_PAGE,
          order: currentOrder,
        });

        const response = await Api.Search.getBuildings(params);

        setNewData(response.data, false);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setLoadNewPage(false);
      }
    };

    if (loadNewPage) {
      getDataByPage();
    }
  }, [
    loadNewPage,
    page,
    query,
    currentOrder,
    setNewData,
  ]);

  return (
    <>
      <Head>
        <title>
          {`Busca ${
            source ? source : reference
          } - Os Melhores imoveis para você!`}
        </title>

        <meta
          name="description"
          content={`Confira os melhores imoveis ${
            source ? "em " + source : ""
          } e encontre o apartamento ideal!`}
        />

        <meta
          name="robots"
          content="noindex,follow"
        />

        <link
          rel="canonical"
          href={canonicalPath}
        />
      </Head>

      <Container id="filtro-container-busca">
        {dataLoaded ? (
          <>
            {total ? (
              <Headerbar
                type="search"
                title={
                  source && !reference
                    ? getSourceText()
                    : undefined
                }
                subtitle={
                  finality &&
                  !reference &&
                  `Imóveis para ${getFinalityText()}`
                }
              />
            ) : null}

            <Wrapper id="filtro-wrapper-busca">
              {total ? (
                <Header>
                  <h3>
                    Encontramos{" "}
                    <strong>{total} imóveis</strong>{" "}
                    para sua busca
                  </h3>

                  <p>
                    Mostrando 1-
                    {buildings?.length || 0} de {total}
                  </p>

                  <HeaderOrder>
                    <DisplayOrder>
                      <button
                        onClick={() =>
                          setIsOrderListActive(
                            !isOrderListActive
                          )
                        }
                      >
                        <img
                          src={
                            isOrderListActive
                              ? IOrderBlockOff
                              : IOrderBlockOn
                          }
                          alt="Botão de ordenar bloco"
                          loading="lazy"
                        />
                      </button>

                      <button
                        onClick={() =>
                          setIsOrderListActive(
                            !isOrderListActive
                          )
                        }
                      >
                        <img
                          src={
                            isOrderListActive
                              ? IOrderRowOn
                              : IOrderRowOff
                          }
                          alt="Botão de ordenar lista"
                          loading="lazy"
                        />
                      </button>
                    </DisplayOrder>

                    <CustomSelect
                      id="finalitySelect"
                      options={finalityOptions}
                      value={finality}
                      onChange={handleFinalityChange}
                    />

                    <OrderFilterDropdown
                      label="Ordenar por"
                      options={orderOptions}
                      value={orderBy || DEFAULT_ORDER}
                      onChange={(value) => {
                        if (!value) {
                          return;
                        }

                        const validOrder =
                          orderOptions.find(
                            (item) =>
                              item.value === value
                          )?.value;

                        if (!validOrder) {
                          return;
                        }

                        setOrderBy(validOrder);
                        handleOrderBy(validOrder);

                        const result =
                          orderOptions.find(
                            (item) =>
                              item.value ===
                              validOrder
                          );

                        if (result) {
                          GTM.dataLayerPush({
                            event:
                              "Custom Field Change",
                            fieldLabel:
                              "Ordernar Por",
                            fieldForm: "Busca",
                            fieldValMin: "",
                            fieldValMax:
                              result.label,
                          });
                        }
                      }}
                    />
                  </HeaderOrder>
                </Header>
              ) : null}

              {total ? (
                <ButtonBack
                  type="button"
                  onClick={toggleSearch}
                >
                  <SVG
                    src={ArrowIconSVG}
                    uniquifyIDs={true}
                  />
                </ButtonBack>
              ) : null}

              <Buildings>
                {total ? (
                  buildings?.map(
                    (building, buildingIndex) => (
                      <React.Fragment
                        key={`building-searchitem-${building.reference}-${buildingIndex}`}
                      >
                        {isOrderListActive ? (
                          <BuildingList
                            item={building}
                            page="search"
                            positionIndex={
                              buildingIndex + 1
                            }
                          />
                        ) : (
                          <BuildingList
                            layout="horizontal"
                            item={building}
                            positionIndex={
                              buildingIndex + 1
                            }
                          />
                        )}

                        {banner &&
                          buildingIndex === 2 &&
                          total >= 5 && (
                            <SearchBanner
                              key={`building-searchbanner-${building.reference}-${buildingIndex}`}
                            >
                              {banner.title && (
                                <Infos>
                                  <h4>
                                    {banner.title}
                                  </h4>

                                  {banner.button_link &&
                                    banner.button_label && (
                                      <div>
                                        <a
                                          href={
                                            banner.button_link
                                          }
                                          target={
                                            banner.button_target
                                          }
                                        >
                                          {
                                            banner.button_label
                                          }
                                        </a>
                                      </div>
                                    )}
                                </Infos>
                              )}

                              {!banner.title &&
                              banner.button_link ? (
                                <a
                                  href={
                                    banner.button_link
                                  }
                                  target={
                                    banner.button_target
                                  }
                                >
                                  <ImageContainer
                                    hideOverlay={true}
                                  >
                                    {banner.imageDesktop && (
                                      <OptimizedBuildingImage
                                        src={
                                          banner.imageDesktop
                                        }
                                        alt="Banner desktop"
                                        layout="fill"
                                        sizes="(max-width: 768px) 100vw, 100vw"
                                        className="banner-image desktop"
                                      />
                                    )}

                                    {banner.imageMobile && (
                                      <OptimizedBuildingImage
                                        src={
                                          banner.imageMobile
                                        }
                                        alt="Banner mobile"
                                        layout="fill"
                                        sizes="(max-width: 768px) 100vw, 100vw"
                                        className="banner-image mobile"
                                      />
                                    )}
                                  </ImageContainer>
                                </a>
                              ) : (
                                <ImageContainer
                                  hideOverlay={
                                    !banner.title
                                  }
                                >
                                  {banner.imageDesktop && (
                                    <OptimizedBuildingImage
                                      src={
                                        banner.imageDesktop
                                      }
                                      alt="Banner desktop"
                                      layout="fill"
                                      sizes="(max-width: 768px) 100vw, 100vw"
                                      className="banner-image desktop"
                                    />
                                  )}

                                  {banner.imageMobile && (
                                    <OptimizedBuildingImage
                                      src={
                                        banner.imageMobile
                                      }
                                      alt="Banner mobile"
                                      layout="fill"
                                      sizes="(max-width: 768px) 100vw, 100vw"
                                      className="banner-image mobile"
                                    />
                                  )}
                                </ImageContainer>
                              )}
                            </SearchBanner>
                          )}
                      </React.Fragment>
                    )
                  )
                ) : (
                  <BuildingsNotFound key="building-searchnotfound">
                    <h6>
                      Não encontramos o imóvel que você procura{" "}
                      <span>:(</span>
                    </h6>

                    <p>
                      Tente fazer uma{" "}
                      <button
                        type="button"
                        onClick={toggleSearch}
                      >
                        nova busca!
                      </button>
                    </p>
                  </BuildingsNotFound>
                )}

                {banner && total < 5 && (
                  <SearchBanner>
                    {banner.title && (
                      <Infos>
                        <h4>{banner.title}</h4>

                        {banner.button_link &&
                          banner.button_label && (
                            <div>
                              <a
                                href={
                                  banner.button_link
                                }
                                target={
                                  banner.button_target
                                }
                              >
                                {banner.button_label}
                              </a>
                            </div>
                          )}
                      </Infos>
                    )}

                    {!banner.title &&
                    banner.button_link ? (
                      <a
                        href={banner.button_link}
                        target={banner.button_target}
                      >
                        <ImageContainer
                          hideOverlay={true}
                        >
                          {banner.imageDesktop && (
                            <OptimizedBuildingImage
                              src={
                                banner.imageDesktop
                              }
                              alt="Banner desktop"
                              layout="fill"
                              sizes="(max-width: 768px) 100vw, 100vw"
                              className="banner-image desktop"
                            />
                          )}

                          {banner.imageMobile && (
                            <OptimizedBuildingImage
                              src={
                                banner.imageMobile
                              }
                              alt="Banner mobile"
                              layout="fill"
                              sizes="(max-width: 768px) 100vw, 100vw"
                              className="banner-image mobile"
                            />
                          )}
                        </ImageContainer>
                      </a>
                    ) : (
                      <ImageContainer
                        hideOverlay={!banner.title}
                      >
                        {banner.imageDesktop && (
                          <OptimizedBuildingImage
                            src={banner.imageDesktop}
                            alt="Banner desktop"
                            layout="fill"
                            sizes="(max-width: 768px) 100vw, 100vw"
                            className="banner-image desktop"
                          />
                        )}

                        {banner.imageMobile && (
                          <OptimizedBuildingImage
                            src={banner.imageMobile}
                            alt="Banner mobile"
                            layout="fill"
                            sizes="(max-width: 768px) 100vw, 100vw"
                            className="banner-image mobile"
                          />
                        )}
                      </ImageContainer>
                    )}
                  </SearchBanner>
                )}

                {total && page < totalPages ? (
                  <BuildingsLoadMore>
                    <Button
                      type="button"
                      disabled={isLoading}
                      className="holos-search-load-more load-more-button"
                      data-showcase="Busca"
                      onClick={loadMore}
                    >
                      {isLoading
                        ? "Carregando..."
                        : "Ver mais"}
                    </Button>
                  </BuildingsLoadMore>
                ) : null}
              </Buildings>
            </Wrapper>

            {suggestions &&
              suggestions.length > 0 &&
              suggestions.map((suggestion, index) => (
                <BuildingsPanel
                  key={`suggestion-${index}`}
                  page="search"
                  headerBig={true}
                  title={suggestion.title}
                  buildingLayout="vertical"
                  data={suggestion.items}
                />
              ))}

            <NewContactSection />
            <NewsletterFooter />
            <BlockHighlighted
              type="contactHome"
              query={query}
            />
          </>
        ) : null}
      </Container>
    </>
  );
}

Search.getInitialProps = async ({ query = {} }) => {
  const queryOrder = Array.isArray(query.order)
    ? query.order[0]
    : query.order;

  const order =
    queryOrder && typeof queryOrder === "string"
      ? queryOrder
      : "";

  const params = getParamsFromObject(
    {
      ...query,
      page: 1,
      limit: 10,
      order,
    },
    true
  );

  const locals = await Api.Search.getLocals();
  const response = await Api.Search.getBuildings(params);

  return {
    ...response,
    locals,
  };
};

Search.hideNewContactSection = true;

export default Search;