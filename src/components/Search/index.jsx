import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import SVG from 'react-inlinesvg';
import Api from 'services';
import { formatCurrency, getParamsFromObject } from 'helpers/utils';

// actions
import { setMain } from 'store/modules/main/actions';

// components
import SearchIconSVG from 'assets/icons/search';
import Input from 'components/Search/FormElements/Input';
import InputSource from 'components/Search/FormElements/InputSource';
import ButtonSource from 'components/Search/FormElements/ButtonSource';
import RangeSlider from 'components/Search/FormElements/RangeSlider';

// assets
import ArrowIconSVG from 'assets/icons/arrow';
import AlertIconSVG from 'assets/icons/alert';

// styles
import {
  Container,
  Form,
  FormWrapper,
  FormGroup,
  FormClose,
  FormHeader,
  FormHeaderTitle,
  FormButtonsFilter,
  FormButtonsFilterTitle,
  FormButtonsFilterRow,
  FormButtonsFilterItemRadio,
  FormButtonFilter,
  FormFooter,
  FormButtonSubmit,
  FormAlert,
  FormAlertTooltip,
  FormButtonAlert,
  FormButtonClear,
  FormTab,
  FormTabButtonBack,
  FormTabClose,
  FormTabTitle,
  FormTabContent,
  FormTabListItemTitle,
  FormTabListItemButton,
  FormTabSlider,
  FormTabSliderTitle
} from './styles';

function Search({ dispatch }) {
  const router = useRouter();
  const { searchFormActive } = useSelector(state => state.main);
  const user = useSelector(state => state.user);
  const [ alertCreated, setAlertCreated ] = useState(false);
  const [ alertMessage, setAlertMessage ] = useState('');
  const [ categoriesData, setCategoriesData ] = useState(null);
  const [ filtersData, setFiltersData ] = useState(null);
  const [ tabActive, setTabActive ] = useState(null);

  const readyReleases = [
    { label: 'Prontos', value: 'pronto' },
    { label: 'Lançamentos', value: 'lancamento' }
  ];

  const sources = [
    { label: 'São Paulo', value: 'sao-paulo' },
    { label: 'Praia', value: 'praia' },
    { label: 'Campo', value: 'campo' },
    { label: 'Internacional', value: 'internacional' }
  ];

  const finalities = [
    {
      label: 'Comprar',
      value: 'venda',
      sources: [ 'sao-paulo', 'praia', 'campo', 'internacional' ]
    },
    {
      label: 'Alugar',
      value: 'aluguel',
      sources: [ 'sao-paulo', 'praia', 'campo' ]
    },
    {
      label: 'Temporada',
      value: 'temporada',
      sources: [ 'praia', 'campo', 'internacional' ]
    }
  ];

  const formik = useFormik({
    initialValues: {
      source: sources[0],
      finality: '',
      use: '',
      ready_release: '',
      furnished: '',
      types: [],
      local: [],
      price_start: '',
      price_end: '',
      area_start: '',
      area_end: '',
      bedroom_start: '',
      bedroom_end: '',
      parking_start: '',
      parking_end: '',
      reference: ''
    },

    onSubmit: values => {
      const data = {};

      Object.keys(values).forEach(key => {
        if (key == 'source' && values[key].value) {
          data[key] = values[key].value;
        } else if (key === 'furnished' && values[key]) {
          data[key] = values[key] === 'Com mobília' ? 'true' : 'false';
        } else if (Array.isArray(values[key]) && values[key].length) {
          data[key] = values[key].join(',');
        } else if (!Array.isArray(values[key]) && values[key]) {
          data[key] = values[key];
        }
      });

      const params = getParamsFromObject(data);

      formik.setFieldValue('reference', '');

      setTabActive(null);

      router.push(`/busca${params}`);
    }
  });

  function closeSearch() {
    dispatch(setMain({ searchFormActive: false }));
  }

  async function createAlert() {
    if (user && user.logged) {
      const resp = await Api.MyAccount.postAlert(
        user.access_token,
        formik.values
      );
      if (resp.status === 'success') {
        setAlertMessage(
          <p>
            <strong>Alerta criado com sucesso!</strong> Você pode acompanhar
            seus alertas no seu perfil.
          </p>
        );
        setAlertCreated(true);
      } else {
        setAlertMessage(<p>{resp.msg}</p>);
        setAlertCreated(true);
      }
    } else {
      dispatch(setMain({ modalLogin: true }));
    }
  }

  function resetForm() {
    setFiltersData(null);
    formik.resetForm();
  }

  function closeAlertTooltip() {
    setAlertCreated(false);
  }

  function setArrayValue(name, value) {
    const arr = formik.values[name];
    const index = arr.indexOf(value);

    if (index < 0) {
      arr.push(value);
    } else {
      arr.splice(index, 1);
    }

    formik.setFieldValue(name, arr);
  }

  function getFiltersParams() {
    const params = [
      `source=${formik.values.source.value}`,
      `finality=${formik.values.finality}`
    ];

    if (formik.values.use) {
      params.push(`use=${formik.values.use}`);
    }

    if (formik.values.ready_release) {
      params.push(`ready_release=${formik.values.ready_release}`);
    }

    if (formik.values.furnished) {
      params.push(
        `furnished=${
          formik.values.furnished.search('Com') >= 0 ? 'true' : 'false'
        }`
      );
    }

    if (formik.values.types.length) {
      params.push(`types=${formik.values.types.join(',')}`);
    }

    if (formik.values.local.length) {
      params.push(`local=${formik.values.local.join(',')}`);
    }

    return `?${params.join('&')}`;
  }

  function resetValuesOnChange(avoidFields = []) {
    const fields = [
      { name: 'use', value: '' },
      { name: 'finality', value: '' },
      { name: 'ready_release', value: '' },
      { name: 'furnished', value: '' },
      { name: 'types', value: [] },
      { name: 'local', value: [] },
      { name: 'price_start', value: '' },
      { name: 'price_end', value: '' },
      { name: 'area_start', value: '' },
      { name: 'area_end', value: '' },
      { name: 'bedroom_start', value: '' },
      { name: 'bedroom_end', value: '' },
      { name: 'parking_start', value: '' },
      { name: 'parking_end', value: '' }
    ];

    fields.forEach(field => {
      const results = avoidFields.filter(item => item == field.name);
      if (!results.length) {
        formik.setFieldValue(field.name, field.value);
      }
    });
  }

  function setSource(source) {
    formik.setFieldValue('source', source);
    setFiltersData(null);
    resetValuesOnChange();
  }

  useEffect(() => {
    if (!formik.values.finality && filtersData) {
      setFiltersData(null);
    }
  }, [ filtersData, formik.values.finality ]);

  useEffect(() => {
    setTabActive(null);
    setFiltersData(null);
    resetValuesOnChange([ 'use' ]);
  }, [ formik.values.use ]);

  useEffect(() => {
    resetValuesOnChange([ 'use', 'finality' ]);
    setTabActive(null);
  }, [ formik.values.finality ]);

  useEffect(() => {
    resetValuesOnChange([ 'use', 'finality', 'ready_release' ]);
    setTabActive(null);
  }, [ formik.values.ready_release ]);

  useEffect(() => {
    resetValuesOnChange([ 'use', 'finality', 'furnished' ]);
    setTabActive(null);
  }, [ formik.values.furnished ]);

  useEffect(() => {
    const getFilters = async () => {
      const params = getFiltersParams();
      const response = await Api.Search.getFilters(params);
      const valuesStringToNumber = [ 'prices', 'area', 'bedrooms', 'parking' ];

      // make sure that all data are Number
      valuesStringToNumber.forEach(key => {
        const obj = response[key];
        if (obj && obj.length) {
          response[key] = response[key].map(value => parseInt(value));
        }
      });

      formik.setFieldValue('local', []);

      setFiltersData(response);
    };

    if (formik.values.finality) {
      getFilters();
    }
  }, [
    formik.values.source.value,
    formik.values.use,
    formik.values.finality,
    formik.values.type,
    formik.values.ready_release,
    formik.values.furnished
  ]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await Api.Search.getCategories();
      setCategoriesData(response);
    };

    getCategories();
  }, []);

  return (
    <Container active={searchFormActive}>
      <Form onSubmit={formik.handleSubmit} onClick={closeSearch}>
        <FormWrapper
          active={searchFormActive}
          onClick={event => event.stopPropagation()}
        >
          <FormHeader>
            <FormHeaderTitle>Quero um imóvel</FormHeaderTitle>
            <FormClose type="button" onClick={closeSearch}>
              Fechar
            </FormClose>
          </FormHeader>

          <FormGroup>
            <InputSource
              type="text"
              name="source"
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.source ? formik.values.source.label : ''}
              disabled={true}
            />
            <ButtonSource type="button" onClick={() => setTabActive('sources')}>
              Alterar localização
            </ButtonSource>
          </FormGroup>

          {formik.values.source.value ? (
            <FormButtonsFilter>
              <FormButtonsFilterTitle>Para:</FormButtonsFilterTitle>

              {/* Residencial, Comercial */}
              {formik.values.source.value == 'sao-paulo' && categoriesData && (
                <FormButtonsFilterRow>
                  {Object.keys(categoriesData).map((use, useIndex) => (
                    <FormButtonsFilterItemRadio
                      twoColumns={true}
                      key={`radio-use-${useIndex}`}
                    >
                      <input
                        type="radio"
                        name="use"
                        value={use}
                        onChange={formik.handleChange}
                        checked={formik.values.use === use}
                      />
                      <span>
                        {use.toLowerCase() == 'residencial'
                          ? 'Morar'
                          : 'Trabalhar'}
                      </span>
                    </FormButtonsFilterItemRadio>
                  ))}
                </FormButtonsFilterRow>
              )}

              {/* Comprar, Alugar */}
              {(formik.values.source.value == 'sao-paulo' &&
                formik.values.use) ||
              formik.values.source.value != 'sao-paulo' ? (
                <FormButtonsFilterRow>
                  {finalities.map((finality, finalityIndex) =>
                    finality.sources.includes(formik.values.source.value) ? (
                      <FormButtonsFilterItemRadio
                        twoColumns={
                          formik.values.source.value == 'sao-paulo'
                            ? true
                            : false
                        }
                        key={`radio-finality-${finalityIndex}`}
                      >
                        <input
                          type="radio"
                          name="finality"
                          value={finality.value}
                          onChange={formik.handleChange}
                          checked={formik.values.finality === finality.value}
                        />
                        <span>{finality.label}</span>
                      </FormButtonsFilterItemRadio>
                    ) : null
                  )}
                </FormButtonsFilterRow>
              ) : null}

              {/* Prontos, Lançamentos */}
              {formik.values.source.value == 'sao-paulo' &&
                formik.values.finality === 'venda' && (
                  <FormButtonsFilterRow>
                    {readyReleases.map((item, itemIndex) => (
                      <FormButtonsFilterItemRadio
                        twoColumns={true}
                        key={`radio-item-${itemIndex}`}
                      >
                        <input
                          type="radio"
                          name="ready_release"
                          value={item.value}
                          onChange={formik.handleChange}
                          checked={formik.values.ready_release === item.value}
                        />
                        <span>{item.label}</span>
                      </FormButtonsFilterItemRadio>
                    ))}
                  </FormButtonsFilterRow>
                )}

              {/* Sem mobilia, com mobilia */}
              {formik.values.source.value == 'sao-paulo' &&
                formik.values.finality === 'aluguel' && (
                  <FormButtonsFilterRow>
                    <FormButtonsFilterItemRadio twoColumns={true}>
                      <input
                        type="radio"
                        name="furnished"
                        value="Sem mobília"
                        onChange={formik.handleChange}
                        checked={formik.values.furnished === 'Sem mobília'}
                      />
                      <span>Sem mobília</span>
                    </FormButtonsFilterItemRadio>
                    <FormButtonsFilterItemRadio twoColumns={true}>
                      <input
                        type="radio"
                        name="furnished"
                        value="Com mobília"
                        onChange={formik.handleChange}
                        checked={formik.values.furnished === 'Com mobília'}
                      />
                      <span>Com mobília</span>
                    </FormButtonsFilterItemRadio>
                  </FormButtonsFilterRow>
                )}
            </FormButtonsFilter>
          ) : null}

          {formik.values.source.value &&
          formik.values.finality &&
          filtersData &&
          ((formik.values.source.value == 'sao-paulo' &&
            formik.values.finality === 'venda' &&
            formik.values.ready_release) ||
            (formik.values.source.value == 'sao-paulo' &&
              formik.values.finality === 'aluguel' &&
              formik.values.furnished) ||
            formik.values.source.value != 'sao-paulo') ? (
            <>
              {filtersData.types && filtersData.types.length ? (
                <FormButtonFilter
                  type="button"
                  active={tabActive === 'types'}
                  onClick={() => setTabActive('types')}
                >
                  <strong>Tipo de imóvel</strong>
                  {formik.values.types.length ? (
                    <span>{formik.values.types.join(', ')}</span>
                  ) : null}
                  <SVG src={ArrowIconSVG} uniquifyIDs={true} />
                </FormButtonFilter>
              ) : null}

              {filtersData.locals && Object.keys(filtersData.locals).length ? (
                <FormButtonFilter
                  type="button"
                  active={tabActive === 'locals'}
                  onClick={() => setTabActive('locals')}
                >
                  <strong>Selecione a localização</strong>
                  {formik.values.local.length ? (
                    <span>{formik.values.local.join(', ')}</span>
                  ) : null}
                  <SVG src={ArrowIconSVG} uniquifyIDs={true} />
                </FormButtonFilter>
              ) : null}

              {(filtersData.prices &&
                filtersData.prices.length &&
                filtersData.prices[0] != filtersData.prices[1]) ||
              (filtersData.area &&
                filtersData.area.length &&
                filtersData.area[0] != filtersData.area[1]) ||
              (filtersData.bedrooms &&
                filtersData.bedrooms.length &&
                filtersData.bedrooms[0] != filtersData.bedrooms[1]) ||
              (filtersData.parking &&
                filtersData.parking.length &&
                filtersData.parking[0] != filtersData.parking[1]) ? (
                <FormButtonFilter
                  type="button"
                  active={tabActive === 'filters'}
                  onClick={() => setTabActive('filters')}
                >
                  <strong>Mais filtros</strong>
                  {(formik.values.price_start && formik.values.price_end) ||
                  (formik.values.area_start && formik.values.area_end) ||
                  (formik.values.bedroom_start && formik.values.bedroom_end) ||
                  (formik.values.parking_start && formik.values.parking_end) ? (
                    <span>
                      {formik.values.price_start && formik.values.price_end
                        ? `Valor R$ ${formatCurrency.format(
                            formik.values.price_start
                          )} a R$ ${formatCurrency.format(
                            formik.values.price_end
                          )}, `
                        : null}

                      {formik.values.area_start && formik.values.area_end
                        ? `Area de ${formik.values.area_start}m a ${formik.values.area_end}m, `
                        : null}

                      {formik.values.bedroom_start && formik.values.bedroom_end
                        ? `Quartos de ${formik.values.bedroom_start} a ${formik.values.bedroom_end}, `
                        : null}

                      {formik.values.parking_start && formik.values.parking_end
                        ? `Vagas de estacionamento de ${formik.values.parking_start} a ${formik.values.parking_end}`
                        : null}
                    </span>
                  ) : null}
                  <SVG src={ArrowIconSVG} uniquifyIDs={true} />
                </FormButtonFilter>
              ) : null}
            </>
          ) : null}

          <FormFooter>
            <FormGroup type="reference">
              <Input
                type="text"
                name="reference"
                placeholder="buscar por referência"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
                value={formik.values.reference}
              />
              <SVG src={SearchIconSVG} uniquifyIDs={true} />
            </FormGroup>
            <FormButtonSubmit
              type="submit"
              disabled={
                !formik.isSubmitting && !filtersData && !formik.values.reference
              }
            >
              Buscar
            </FormButtonSubmit>
            <FormAlert>
              <FormAlertTooltip
                active={alertCreated}
                onClick={closeAlertTooltip}
              >
                {alertMessage}
              </FormAlertTooltip>
              <FormButtonAlert
                type="button"
                active={alertCreated}
                disabled={
                  !formik.isSubmitting &&
                  !filtersData &&
                  !formik.values.reference
                }
                onClick={createAlert}
              >
                <SVG src={AlertIconSVG} uniquifyIDs={true} /> Criar alerta
              </FormButtonAlert>
            </FormAlert>
            <FormButtonClear
              type="button"
              disabled={
                !formik.isSubmitting && !filtersData && !formik.values.reference
              }
              onClick={resetForm}
            >
              Limpar filtros
            </FormButtonClear>
          </FormFooter>
        </FormWrapper>

        <FormTab
          active={tabActive === 'sources'}
          onClick={event => event.stopPropagation()}
        >
          <FormTabButtonBack type="button" onClick={() => setTabActive(null)}>
            <SVG src={ArrowIconSVG} uniquifyIDs={true} />
          </FormTabButtonBack>
          <FormTabClose type="button" onClick={() => setTabActive(null)}>
            Fechar
          </FormTabClose>
          <FormTabTitle>Bairros</FormTabTitle>
          <FormTabContent>
            <ul>
              {sources.map((source, sourceIndex) => (
                <li key={`local-${sourceIndex}`}>
                  <FormTabListItemButton
                    type="button"
                    active={
                      formik.values.source &&
                      formik.values.source.value === source.value
                    }
                    onClick={() => {
                      setTabActive(null);
                      setSource(source);
                    }}
                  >
                    {source.label}
                  </FormTabListItemButton>
                </li>
              ))}
            </ul>
          </FormTabContent>
        </FormTab>

        {filtersData && filtersData.types && filtersData.types.length ? (
          <FormTab
            active={tabActive === 'types'}
            onClick={event => event.stopPropagation()}
          >
            <FormTabButtonBack type="button" onClick={() => setTabActive(null)}>
              <SVG src={ArrowIconSVG} uniquifyIDs={true} />
            </FormTabButtonBack>
            <FormTabClose type="button" onClick={() => setTabActive(null)}>
              Fechar
            </FormTabClose>
            <FormTabTitle>Tipo de imóvel</FormTabTitle>
            <FormTabContent>
              <ul>
                {filtersData.types.map((type, typeIndex) => (
                  <li key={`type-${type}-${typeIndex}`}>
                    <FormTabListItemButton
                      type="button"
                      active={formik.values.types.includes(type)}
                      onClick={() => setArrayValue('types', type)}
                    >
                      {type}
                    </FormTabListItemButton>
                  </li>
                ))}
              </ul>
            </FormTabContent>
          </FormTab>
        ) : null}

        {filtersData && filtersData.locals ? (
          <FormTab
            active={tabActive === 'locals'}
            onClick={event => event.stopPropagation()}
          >
            <FormTabButtonBack type="button" onClick={() => setTabActive(null)}>
              <SVG src={ArrowIconSVG} uniquifyIDs={true} />
            </FormTabButtonBack>
            <FormTabClose type="button" onClick={() => setTabActive(null)}>
              Fechar
            </FormTabClose>
            <FormTabTitle>{formik.values.source.value === 'sao-paulo' ? 'Bairros' : 'Locais'}</FormTabTitle>
            <FormTabContent>
              <ul>
                {Object.keys(filtersData.locals).map((local, localIndex) => (
                  <li key={`local-${local}-${localIndex}`}>
                    {formik.values.source.value !== 'sao-paulo' && (
                      <FormTabListItemTitle>
                        {local == 'SP' ? 'São Paulo' : local}
                      </FormTabListItemTitle>
                    )}
                    {filtersData.locals[local].length ? (
                      <ul>
                        {filtersData.locals[local].map(
                          (localItem, localItemIndex) => (
                            <li
                              key={`localitem-${localItem}-${localItemIndex}`}
                            >
                              <FormTabListItemButton
                                type="button"
                                active={formik.values.local.includes(localItem)}
                                onClick={() =>
                                  setArrayValue('local', localItem)
                                }
                              >
                                {localItem}
                              </FormTabListItemButton>
                            </li>
                          )
                        )}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </FormTabContent>
          </FormTab>
        ) : null}

        {filtersData ? (
          <FormTab
            active={tabActive === 'filters'}
            onClick={event => event.stopPropagation()}
          >
            <FormTabButtonBack type="button" onClick={() => setTabActive(null)}>
              <SVG src={ArrowIconSVG} uniquifyIDs={true} />
            </FormTabButtonBack>
            <FormTabClose type="button" onClick={() => setTabActive(null)}>
              Fechar
            </FormTabClose>
            <FormTabTitle>Locais</FormTabTitle>
            <FormTabContent>
              {filtersData.prices &&
              filtersData.prices.length &&
              filtersData.prices[0] != filtersData.prices[1] ? (
                <FormTabSlider>
                  <FormTabSliderTitle>Valor</FormTabSliderTitle>
                  <RangeSlider
                    type="prices"
                    data={filtersData.prices}
                    prefix="R$ "
                    onChange={values => {
                      formik.setFieldValue('price_start', values[0]);
                      formik.setFieldValue('price_end', values[1]);
                    }}
                  />
                </FormTabSlider>
              ) : null}

              {filtersData.area &&
              filtersData.area.length &&
              filtersData.area[0] != filtersData.area[1] ? (
                <FormTabSlider>
                  <FormTabSliderTitle>Área útil</FormTabSliderTitle>
                  <RangeSlider
                    data={filtersData.area}
                    sep="a"
                    step={1}
                    suffix=" m"
                    onChange={values => {
                      formik.setFieldValue('area_start', values[0]);
                      formik.setFieldValue('area_end', values[1]);
                    }}
                  />
                </FormTabSlider>
              ) : null}

              {filtersData.bedrooms &&
              filtersData.bedrooms.length &&
              filtersData.bedrooms[0] != filtersData.bedrooms[1] ? (
                <FormTabSlider>
                  <FormTabSliderTitle>Dormitórios</FormTabSliderTitle>
                  <RangeSlider
                    data={filtersData.bedrooms}
                    sep="a"
                    step={1}
                    onChange={values => {
                      formik.setFieldValue('bedroom_start', values[0]);
                      formik.setFieldValue('bedroom_end', values[1]);
                    }}
                  />
                </FormTabSlider>
              ) : null}

              {filtersData.parking &&
              filtersData.parking.length &&
              filtersData.parking[0] != filtersData.parking[1] ? (
                <FormTabSlider>
                  <FormTabSliderTitle>
                    Vagas de estacionamento
                  </FormTabSliderTitle>
                  <RangeSlider
                    data={filtersData.parking}
                    sep="a"
                    step={1}
                    onChange={values => {
                      formik.setFieldValue('parking_start', values[0]);
                      formik.setFieldValue('parking_end', values[1]);
                    }}
                  />
                </FormTabSlider>
              ) : null}
            </FormTabContent>
          </FormTab>
        ) : null}
      </Form>
    </Container>
  );
}

export default connect()(Search);
