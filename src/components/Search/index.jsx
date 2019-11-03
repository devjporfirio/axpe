import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import SVG from 'react-inlinesvg';
import Api from 'services';
import { formatCurrency } from 'helpers/utils';

// actions
import { setSearch } from 'store/modules/search/actions';

// components
import SearchIconSVG from 'assets/icons/search';
import Input from 'components/Search/FormElements/Input'
import InputSource from 'components/Search/FormElements/InputSource'
import ButtonSource from 'components/Search/FormElements/ButtonSource'
import RangeSlider from 'components/Search/FormElements/RangeSlider'

// assets
import ArrowIconSVG from 'assets/icons/arrow.svg';

// styles
import {
  Container,
  Form,
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
  FormButtonAlert,
  FormTab,
  FormTabButtonBack,
  FormTabTitle,
  FormTabContent,
  FormTabListItemTitle,
  FormTabListItemButton,
  FormTabSlider,
  FormTabSliderTitle
} from './styles';

function Search({ dispatch }) {
  const { active } = useSelector(state => state.search);
  const [ usesData, setUsesData ] = useState(null);
  const [ filtersData, setFiltersData ] = useState(null);
  const [ tabActive, setTabActive ] = useState(null);

  const types = [
    { label: 'Prontos', value: 'pronto' },
    { label: 'Lançamentos', value: 'lancamento' }
  ];

  const sources = [
    { label: 'São Paulo', value: 'sao-paulo' },
    { label: 'Praia', value: 'praia' },
    { label: 'Campo', value: 'campo' },
    { label: 'Internacional', value: 'internacional' },
  ];

  const finalities = [
    { label: 'Comprar', value: 'venda', sources: [ 'sao-paulo', 'praia', 'campo', 'internacional' ] },
    { label: 'Alugar', value: 'aluguel', sources: [ 'sao-paulo', 'praia', 'campo' ] },
    { label: 'Temporada', value: 'temporada', sources: [ 'praia', 'campo', 'internacional' ] }
  ]

  const formik = useFormik({
    initialValues: {
      source: sources[0],
      finality: '',
      use: '',
      type: '',
      furnished: '',
      category: [],
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
      // console.log('submit', values)
    }
  });

  function closeSearch() {
    dispatch(setSearch({ active: false }))
  }

  function setArrayValue(name, value) {
    const arr = formik.values[name];
    const index = arr.indexOf(value);

    if(index < 0) {
      arr.push(value)
    } else {
      arr.splice(index, 1)
    }

    formik.setFieldValue(name, arr);
  }

  function getFiltersParams() {
    const params = [ `source=${formik.values.source.value}`, `finality=${formik.values.finality}` ];

    if(formik.values.use) {
      params.push(`use=${formik.values.use}`);
    }

    if(formik.values.type) {
      params.push(`type=${formik.values.type}`);
    }

    if(formik.values.category.length) {
      params.push(`category=${formik.values.category.join(',')}`);
    }

    if(formik.values.local.length) {
      params.push(`local=${formik.values.local.join(',')}`);
    }

    return params.join('&');
  }

  function resetValuesOnChange() {
    formik.setFieldValue('use', '');
    formik.setFieldValue('finality', '');
    formik.setFieldValue('type', '');
    formik.setFieldValue('furnished', '');
    formik.setFieldValue('category', []);
    formik.setFieldValue('local', []);
    formik.setFieldValue('price_start', '');
    formik.setFieldValue('price_end', '');
    formik.setFieldValue('area_start', '');
    formik.setFieldValue('area_end', '');
    formik.setFieldValue('bedroom_start', '');
    formik.setFieldValue('bedroom_end', '');
    formik.setFieldValue('parking_start', '');
    formik.setFieldValue('parking_end', '');
  }

  function setSource(source) {
    formik.setFieldValue('source', source);
    resetValuesOnChange();
  }

  useEffect(() => {
    const getUses = async () => {
      const response = await Api.Search.getUses();
      setUsesData(response);
    }

    const getFilters = async () => {
      const params = getFiltersParams();
      const response = await Api.Search.getFilters(params);
      const valuesStringToNumber = [ 'prices', 'area', 'bedrooms', 'parking' ];

      // Make sure that all data are Number
      valuesStringToNumber.forEach(key => {
        const obj = response[key];
        if(obj && obj.length) {
          response[key] = response[key].map(value => parseInt(value));
        }
      })

      formik.setFieldValue('category', []);
      formik.setFieldValue('local', []);

      setFiltersData(response);
    }

    if(!usesData) {
      getUses();
    }

    if(formik.values.finality) {
      getFilters();
    }
  }, [ formik.values.source.value, formik.values.use, formik.values.finality, formik.values.type, formik.values.furnished ]);

  return (
    <Container active={active}>
        <Form onSubmit={formik.handleSubmit}>
          <FormHeader>
            <FormHeaderTitle>Quero um imóvel</FormHeaderTitle>
            <FormClose type="button" onClick={closeSearch}>Fechar</FormClose>
          </FormHeader>

          <FormGroup>
            <InputSource type="text" name="source" onChange={formik.handleChange} onBlur={formik.handleChange} value={formik.values.source ? formik.values.source.label : ''} disabled={true} />
            <ButtonSource type="button" onClick={() => setTabActive('sources')}>Alterar localização</ButtonSource>
          </FormGroup>

          {formik.values.source.value ? (
            <FormButtonsFilter>
              <FormButtonsFilterTitle>Para:</FormButtonsFilterTitle>

              {/* Residencial, Comercial */}
              {formik.values.source.value == 'sao-paulo' && usesData && (
                <FormButtonsFilterRow>
                  {Object.keys(usesData).map((use, useIndex) => (
                    <FormButtonsFilterItemRadio twoColumns={true} key={`radio-use-${useIndex}`}>
                      <input type="radio" name="use" value={use} onChange={formik.handleChange} checked={formik.values.use === use} />
                      <span>{use.toLowerCase() == 'residencial' ? 'Morar' : 'Trabalhar'}</span>
                    </FormButtonsFilterItemRadio>
                  ))}
                </FormButtonsFilterRow>
              )}

              {/* Comprar, Alugar */}
              {(formik.values.source.value == 'sao-paulo' && formik.values.use) || formik.values.source.value != 'sao-paulo' ? (
                <FormButtonsFilterRow>
                  {finalities.map((finality, finalityIndex) => finality.sources.includes(formik.values.source.value) ? (
                    <FormButtonsFilterItemRadio twoColumns={formik.values.source.value == 'sao-paulo' ? true : false} key={`radio-finality-${finalityIndex}`}>
                      <input type="radio" name="finality" value={finality.value} onChange={formik.handleChange} checked={formik.values.finality === finality.value} />
                      <span>{finality.label}</span>
                    </FormButtonsFilterItemRadio>
                  ) : null)}
                </FormButtonsFilterRow>
              ) : null}

              {/* Prontos, Lançamentos */}
              {formik.values.source.value == 'sao-paulo' && formik.values.finality === 'venda' && (
                <FormButtonsFilterRow>
                  {types.map((type, typeIndex) => (
                    <FormButtonsFilterItemRadio twoColumns={true} key={`radio-type-${typeIndex}`}>
                      <input type="radio" name="type" value={type.value} onChange={formik.handleChange} checked={formik.values.type === type.value} />
                      <span>{type.label}</span>
                    </FormButtonsFilterItemRadio>
                  ))}
                </FormButtonsFilterRow>
              )}

              {/* Sem mobilia, com mobilia */}
              {formik.values.source.value == 'sao-paulo' && formik.values.finality === 'aluguel' && (
                <FormButtonsFilterRow>
                  <FormButtonsFilterItemRadio twoColumns={true}>
                    <input type="radio" name="furnished" value="Sem mobília" onChange={formik.handleChange} checked={formik.values.furnished === 'Sem mobília'} />
                    <span>Sem mobília</span>
                  </FormButtonsFilterItemRadio>
                  <FormButtonsFilterItemRadio twoColumns={true}>
                    <input type="radio" name="furnished" value="Com mobília" onChange={formik.handleChange} checked={formik.values.furnished === 'Com mobília'} />
                    <span>Com mobília</span>
                  </FormButtonsFilterItemRadio>
                </FormButtonsFilterRow>
              )}
            </FormButtonsFilter>
          ) : null}

          {
            formik.values.source.value && formik.values.finality && filtersData &&
            ((
              formik.values.source.value == 'sao-paulo' &&
              formik.values.finality === 'venda' &&
              formik.values.type
            ) ||
            (
              formik.values.source.value == 'sao-paulo' &&
              formik.values.finality === 'aluguel' &&
              formik.values.furnished
            ) ||
              formik.values.source.value != 'sao-paulo'
            ) ? (
            <>
              {filtersData.types && filtersData.types.length ? (
                <FormButtonFilter type="button" onClick={() => setTabActive('categories')}>
                  <strong>Tipo de imóvel</strong>
                  {formik.values.category.length ? <span>{formik.values.category.join(', ')}</span> : null}
                  <SVG src={ArrowIconSVG} />
                </FormButtonFilter>
              ) : null}

              {filtersData.locals ? (
                <FormButtonFilter type="button" onClick={() => setTabActive('locals')}>
                  <strong>Selecione a localização</strong>
                  {formik.values.local.length ? <span>{formik.values.local.length > 5 ? `${formik.values.local.slice(0, 5).join(', ')}...` : formik.values.local.join(', ')}</span> : null}
                  <SVG src={ArrowIconSVG} />
                </FormButtonFilter>
              ) : null}

              <FormButtonFilter type="button" onClick={() => setTabActive('filters')}>
                <strong>Mais filtros</strong>
                <span>
                  {formik.values.price_start && formik.values.price_end ? (
                    `Valor R$ ${formatCurrency.format(formik.values.price_start)} a R$ ${formatCurrency.format(formik.values.price_end)}, `
                  ) : null}

                  {formik.values.area_start && formik.values.area_end ? (
                    `Area de ${formik.values.area_start}m a ${formik.values.area_end}m, `
                  ) : null}

                  {formik.values.bedroom_start && formik.values.bedroom_end ? (
                    `Quartos de ${formik.values.bedroom_start} a ${formik.values.bedroom_end}, `
                  ) : null}

                  {formik.values.parking_start && formik.values.parking_end ? (
                    `Vagas de estacionamento de ${formik.values.parking_start} a ${formik.values.parking_end}`
                  ) : null}
                </span>
                <SVG src={ArrowIconSVG} />
              </FormButtonFilter>
            </>
          ) : null}

          <FormTab active={tabActive === 'sources'}>
            <FormTabButtonBack type="button" onClick={() => setTabActive(null)}>
              <SVG src={ArrowIconSVG} />
            </FormTabButtonBack>
            <FormTabTitle>Locais</FormTabTitle>
            <FormTabContent>
              <ul>
                {sources.map((source, sourceIndex) => (
                  <li key={`local-${sourceIndex}`}>
                    <FormTabListItemButton type="button" active={formik.values.source && formik.values.source.value === source.value} onClick={() => setSource(source)}>{source.label}</FormTabListItemButton>
                  </li>
                ))}
              </ul>
            </FormTabContent>
          </FormTab>

          {filtersData && filtersData.types && filtersData.types.length ? (
            <FormTab active={tabActive === 'categories'}>
              <FormTabButtonBack type="button" onClick={() => setTabActive(null)}>
                <SVG src={ArrowIconSVG} />
              </FormTabButtonBack>
              <FormTabTitle>Tipo de imóvel</FormTabTitle>
              <FormTabContent>
                <ul>
                  {filtersData.types.map((type, typeIndex) => (
                    <li key={`type-${type}-${typeIndex}`}>
                      <FormTabListItemButton type="button" active={formik.values.category.includes(type)} onClick={() => setArrayValue('category', type)}>{type}</FormTabListItemButton>
                    </li>
                  ))}
                </ul>
              </FormTabContent>
            </FormTab>
          ) : null}

          {filtersData && filtersData.locals ? (
            <FormTab active={tabActive === 'locals'}>
              <FormTabButtonBack type="button" onClick={() => setTabActive(null)}>
                <SVG src={ArrowIconSVG} />
              </FormTabButtonBack>
              <FormTabTitle>Locais</FormTabTitle>
              <FormTabContent>
                <ul>
                  {Object.keys(filtersData.locals).map((local, localIndex) => (
                    <li key={`local-${local}-${localIndex}`}>
                      <FormTabListItemTitle>{local == 'SP' ? 'São Paulo' : local}</FormTabListItemTitle>
                      {filtersData.locals[local].length ? (
                        <ul>
                          {filtersData.locals[local].map((localItem, localItemIndex) => (
                            <li key={`localitem-${localItem}-${localItemIndex}`}>
                              <FormTabListItemButton type="button" active={formik.values.local.includes(localItem)} onClick={() => setArrayValue('local', localItem)}>{localItem}</FormTabListItemButton>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </FormTabContent>
            </FormTab>
          ) : null}

          {filtersData ? (
            <FormTab active={tabActive === 'filters'}>
              <FormTabButtonBack type="button" onClick={() => setTabActive(null)}>
                <SVG src={ArrowIconSVG} />
              </FormTabButtonBack>
              <FormTabTitle>Locais</FormTabTitle>
              <FormTabContent>
                {filtersData.prices && filtersData.prices.length && filtersData.prices[0] && filtersData.prices[1] ? (
                  <FormTabSlider>
                    <FormTabSliderTitle>Valor</FormTabSliderTitle>
                    <RangeSlider type="prices" data={filtersData.prices} prefix="R$ " onChange={values => {
                      formik.setFieldValue('price_start', values[0]);
                      formik.setFieldValue('price_end', values[1]);
                    }} />
                  </FormTabSlider>
                ) : null}

                {filtersData.area && filtersData.area.length && filtersData.area[0] && filtersData.area[1] ? (
                  <FormTabSlider>
                    <FormTabSliderTitle>Área útil</FormTabSliderTitle>
                    <RangeSlider data={filtersData.area} sep="a" step={1} suffix=" m" onChange={values => {
                      formik.setFieldValue('area_start', values[0]);
                      formik.setFieldValue('area_end', values[1]);
                    }} />
                  </FormTabSlider>
                ) : null}

                {filtersData.bedrooms && filtersData.bedrooms.length && filtersData.bedrooms[0] && filtersData.bedrooms[1] ? (
                  <FormTabSlider>
                    <FormTabSliderTitle>Dormitórios</FormTabSliderTitle>
                    <RangeSlider data={filtersData.bedrooms} sep="a" step={1} onChange={values => {
                      formik.setFieldValue('bedroom_start', values[0]);
                      formik.setFieldValue('bedroom_end', values[1]);
                    }} />
                  </FormTabSlider>
                ) : null}

                {filtersData.parking && filtersData.parking.length && filtersData.parking[0] && filtersData.parking[1] ? (
                  <FormTabSlider>
                    <FormTabSliderTitle>Vagas de estacionamento</FormTabSliderTitle>
                    <RangeSlider data={filtersData.parking} sep="a" step={1} onChange={values => {
                      formik.setFieldValue('parking_start', values[0]);
                      formik.setFieldValue('parking_end', values[1]);
                    }} />
                  </FormTabSlider>
                ) : null}
              </FormTabContent>
            </FormTab>
          ) : null}

          <FormFooter>
            <FormGroup type="reference">
              <Input type="text" name="reference" placeholder="buscar por referência" onChange={formik.handleChange} onBlur={formik.handleChange} />
              <SVG src={SearchIconSVG} />
            </FormGroup>
            <FormButtonSubmit type="submit" disabled={!formik.isSubmitting && !filtersData && !formik.values.reference}>Buscar</FormButtonSubmit>
            <FormButtonAlert type="button"></FormButtonAlert>
          </FormFooter>

        </Form>
    </Container>
  )
}

export default connect()(Search);
