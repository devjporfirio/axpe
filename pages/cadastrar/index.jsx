import React, { useRef, useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import SVG from 'react-inlinesvg';
import Api from 'services';
import * as Yup from 'yup';

// components
import BlockHighlighted from 'components/BlockHighlighted';
import FormElements from 'components/FormElements';
import Contact from 'components/Contact';
import UserInfo from 'components/UserInfo';

// helpers
import GTM from 'helpers/gtm';
import SeoData from 'helpers/seo';
import { getParamsFromObject } from 'helpers/utils';

// actions
import { setMain } from 'store/modules/main/actions';

// images
import CloseIconSVG from 'assets/icons/close-white';

// styles
import { FormGroup } from 'components/FormElements/styles';

import {
  Container,
  Body,
  Form,
  FormGroupTwo,
  FormGroupFlex,
  FormGroupRow,
  FormRow,
  FormGroupValues,
  FormGroupValuesSub,
  FormGroupAddress,
  FormGroupPhotos,
  Description,
  GroupImages,
  GroupImage,
  Image,
  FormGroupFooter,
  ButtonSubmit,
} from 'pages/Register/styles';

const registrySchema = Yup.object().shape({
  SingleLine5: Yup.string()
    .oneOf([ 'Residencial', 'Comercial', 'Praia', 'Campo', 'Internacional' ])
    .required(),
  SingleLine6: Yup.string().required(),
  DecisionBox: Yup.string().required(),
  Radio: Yup.string().required(),
  Name_First: Yup.string().required(),
  Name_Last: Yup.string().required(),
  PhoneNumber_countrycode: Yup.string(),
  Email: Yup.string().required(),
  SingleLine11: Yup.string(),
  SingleLine: Yup.string().required(),
  SingleLine2: Yup.string().required(),
  SingleLine3: Yup.string(),
  SingleLine4: Yup.string(),
  SingleLine7: Yup.string().required(),
  SingleLine8: Yup.string(),
  Number2: Yup.string().required(),
  Number: Yup.string(),
  Number1: Yup.string().required(),
  SingleLine12: Yup.string().required(),
  SingleLine13: Yup.string(),
  Currency: Yup.string(),
  Currency_copy: Yup.string(),
  Currency1: Yup.string(),
  Currency1_copy: Yup.string(),
  Currency2: Yup.string(),
  Currency2_copy: Yup.string(),
  Currency3: Yup.string(),
  Currency3_copy: Yup.string(),
  MultiLine: Yup.string(),
  MultiLine2: Yup.string().required(),
  MultiLine1: Yup.string().required(),
  finalityVender: Yup.string().required(),
  finalityAluguel: Yup.string().required(),
  SingleLine9: Yup.string(),
  SingleLine10: Yup.string(),
  images: Yup.array(),
  // terms: Yup.boolean()
  //   .oneOf([ true ])
  //   .required(),
});

function Register({ locals, categories, countries }) {
  const dispatch = useDispatch();
  const refForm = useRef(null);
  const user = useSelector((state) => state.user);
  // const [ keyLocals, setKeyLocals ] = useState('São Paulo');
  const [ keyLocals ] = useState('São Paulo');
  const [ cats, setCats ] = useState([]);
  const [ localsByKey, setLocalsByKey ] = useState([
    { label: 'Selecione', value: '' },
  ]);

  const optionsCountries = [
    { label: 'Selecione uma opção', value: '' },
    { label: '&Aacute;frica do Sul', value: '&Aacute;frica do Sul' },
    { label: 'Argentina', value: 'Argentina' },
    { label: '&Aacute;ustria', value: '&Aacute;ustria' },
    { label: 'Austr&aacute;lia', value: 'Austr&aacute;lia' },
    { label: 'Bahamas', value: 'Bahamas' },
    { label: 'Barbados', value: 'Barbados' },
    { label: 'Belize', value: 'Belize' },
    { label: 'Bermuda', value: 'Bermuda' },
    { label: 'Canad&aacute;', value: 'Canad&aacute;' },
    { label: 'Chile', value: 'Chile' },
    { label: 'Colombia', value: 'Colombia' },
    { label: 'Costa Rica', value: 'Costa Rica' },
    { label: 'Emirados &Aacute;rabes', value: 'Emirados &Aacute;rabes' },
    { label: 'Esc&oacute;cia', value: 'Esc&oacute;cia' },
    { label: 'Espanha', value: 'Espanha' },
    { label: 'EUA', value: 'EUA' },
    { label: 'Fiji', value: 'Fiji' },
    { label: 'Fran&ccedil;a', value: 'Fran&ccedil;a' },
    { label: 'Gr&eacute;cia', value: 'Gr&eacute;cia' },
    { label: 'Holanda', value: 'Holanda' },
    { label: 'Hong Kong', value: 'Hong Kong' },
    { label: 'Ilhas Cayman', value: 'Ilhas Cayman' },
    { label: 'Ilhas Turks e Caicos', value: 'Ilhas Turks e Caicos' },
    { label: 'Ilhas Virgens', value: 'Ilhas Virgens' },
    { label: 'Inglaterra', value: 'Inglaterra' },
    { label: 'Irlanda', value: 'Irlanda' },
    { label: 'It&aacute;lia', value: 'It&aacute;lia' },
    { label: 'Maldivas', value: 'Maldivas' },
    { label: 'Marrocos', value: 'Marrocos' },
    { label: 'M&eacute;xico', value: 'M&eacute;xico' },
    { label: 'M&ocirc;naco', value: 'M&ocirc;naco' },
    { label: 'Nova Zel&acirc;ndia', value: 'Nova Zel&acirc;ndia' },
    { label: 'Panam&aacute;', value: 'Panam&aacute;' },
    { label: 'Porto Rico', value: 'Porto Rico' },
    { label: 'Portugal', value: 'Portugal' },
    {
      label: 'Rep&uacute;blica Dominicana',
      value: 'Rep&uacute;blica Dominicana',
    },
    { label: 'Singapura', value: 'Singapura' },
    { label: 'Su&eacute;cia', value: 'Su&eacute;cia' },
    { label: 'Su&iacute;&ccedil;a', value: 'Su&iacute;&ccedil;a' },
    { label: 'S&atilde;o Bartolomeu', value: 'S&atilde;o Bartolomeu' },
    { label: 'Uruguai', value: 'Uruguai' },
  ];

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      zf_referrer_name: '',
      zf_redirect_url: 'http://homolog.axpe.com.br/cadastrar/sucesso',
      zc_gad: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      Dropdown: 'Proprietário',
      SingleLine6: '', // Tipo de Comercialização - Apenas Venda, Apenas Locação ou Venda e Locação
      SingleLine5: 'Residencial', // Categoria do Imóvel - Residencial, Comercial, Praia, Campo ou Internacional
      DecisionBox: true,
      Radio: 'Novo Lead',
      Name_First: user.me.name,
      Name_Last: user.me.lastName,
      PhoneNumber_countrycode: user.me.phone,
      Email: user.me.email,
      SingleLine11: '', // Tipo do Imóvel - Apartamento, Casa, Cobertura, Conjunto, etc
      SingleLine: '', // Endereço
      SingleLine2: '', // Número
      SingleLine3: '', // Complemento
      SingleLine4: '', // Cidade
      SingleLine7: '', // Bairros
      SingleLine8: '', // País
      Number2: '', // Area util
      Number: '', // Quartos
      Number1: '', // Vagas
      SingleLine13: '',
      SingleLine12: '', // Imóvel vago? Sim ou Não
      Currency_copy: '', // Valor de venda
      Currency: '', // Valor de venda
      Currency1: '', // Valor de aluguel
      Currency1_copy: '', // Valor de aluguel
      Currency2: '', // Valor de condominio
      Currency2_copy: '', // Valor de condominio
      Currency3: '', // Valor de iptu
      Currency3_copy: '', // Valor de iptu
      MultiLine: '', // Fotos urls
      MultiLine2: '', // O que o imóvel tem de melhor?
      MultiLine1: '', // O que não é tão bacana
      SingleLine9: '', // Praia
      SingleLine10: '', // Condominio
      finalityVender: false,
      finalityAluguel: false,
      images: [],
      terms: false,
    },
    validationSchema: registrySchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      values.Currency = values.Currency.replace('R$', '');
      values.Currency2 = values.Currency2.replace('R$', '');

      const response = await Api.User.postRegisterProperty(user.access_token, {
        files: values.images,
      });

      if (response.status) {
        setFieldValue('MultiLine', response.imgs.join(', '));
      }

      setTimeout(() => {
        refForm.current.submit();
      }, 500);
    },
  });

  const changeType = useCallback((field, value) => {
    setFieldValue(field, value);
    GTM.dataLayerPush({
      event: 'Custom Field Change',
      fieldLabel: 'Qual o perfil do imóvel que deseja cadastrar?',
      fieldForm: 'Cadastrar Imóvel',
      fieldValMin: '',
      fieldValMax: value,
    });
  }, []);

  const updateLocals = useCallback(async () => {
    const source =
      values.SingleLine5 === 'Residencial' || values.SingleLine5 === 'Comercial'
        ? 'sao-paulo'
        : values.SingleLine5.toLowerCase();
    const currentLocal = source === 'sao-paulo' ? 'São Paulo' : values.SingleLine5;
    const use =
      source === 'sao-paulo' ? values.SingleLine5.toUpperCase() : null;
    let finality = null;

    if (values.finalityVender && !values.finalityAluguel) {
      finality = 'venda';
    } else if (!values.finalityVender && values.finalityAluguel) {
      finality = 'aluguel';
    }

    const params = {
      source,
      finality,
      use,
    };

    const response = await Api.Search.getFilters(getParamsFromObject(params));

    if(response.locals[currentLocal]) {
      const newLocals = [{ label: 'Selecione', value: '' }].concat(
        response.locals[currentLocal].map((y) => ({ label: y, value: y }))
      );
      setLocalsByKey(newLocals);
    }
  }, [ values ]);

  useEffect(() => {
    async function loadMe() {
      if (user && user.logged) {
        dispatch(setMain({ modalLogin: false }));
        setFieldValue('Name_First', user.me.name);
        setFieldValue('Name_Last', user.me.lastName);
        setFieldValue('PhoneNumber_countrycode', user.me.phone);
        setFieldValue('Email', user.me.email);
      } else {
        dispatch(
          setMain({
            modalLogin: '/cadastrar',
          })
        );
      }
    }

    loadMe();
  }, [ user ]);

  useEffect(() => {
    updateLocals();
  }, [
    keyLocals,
    values.SingleLine5,
    values.finalityVender,
    values.finalityAluguel,
  ]);

  useEffect(() => {
    let newCats =
      categories && Object.keys(categories).length > 0 && values.SingleLine5
        ? categories[values.SingleLine5.toUpperCase()]
        : null;

    if (newCats) {
      newCats = [{ label: 'Selecione', value: '' }].concat(
        categories[values.SingleLine5.toUpperCase()].map((x) => ({
          label: x,
          value: x,
        }))
      );
    }

    setCats(newCats);
  }, [ categories, values ]);

  const handleRemoveImage = useCallback(
    (position) => {
      const newList = [ ...values.images ];

      newList.splice(position, 1);

      setFieldValue('images', newList);
    },
    [ values ]
  );

  const setFinality = useCallback((sell, rent) => {
    let result = '';

    if (sell && rent) {
      result = 'Venda e Locação';
    } else if (sell) {
      result = 'Apenas Venda';
    } else if (rent) {
      result = 'Apenas Locação';
    }

    setFieldValue('SingleLine6', result);
  }, []);

  return (
    <>
      <Head>
        <title>{`Cadastre seu imóvel - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        <BlockHighlighted type="registerProperty" />
        <Body>
          <Form
            ref={refForm}
            action="https://forms.zohopublic.com/axpeimoveis1/form/SITECADASTROGERAL/formperma/kS1k-h1kXXOhkZbL-r5ZJvV0cpaVSWVg-cm5AoLytbg/htmlRecords/submit"
            method="POST"
            accept-charset="UTF-8"
            enctype="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <input
              type="hidden"
              name="zf_referrer_name"
              value={values.zf_referrer_name}
            />
            <input
              type="hidden"
              name="zf_redirect_url"
              value={values.zf_redirect_url}
            />
            <input type="hidden" name="zc_gad" value={values.zc_gad} />
            <input type="hidden" name="utm_source" value={values.utm_source} />
            <input type="hidden" name="utm_medium" value={values.utm_medium} />
            <input
              type="hidden"
              name="utm_campaign"
              value={values.utm_campaign}
            />
            <input type="hidden" name="utm_term" value={values.utm_term} />
            <input
              type="hidden"
              name="utm_content"
              value={values.utm_content}
            />
            <input type="hidden" name="Name_First" value={values.Name_First} />
            <input type="hidden" name="Name_Last" value={values.Name_Last} />
            <input
              type="hidden"
              name="PhoneNumber_countrycode"
              value={values.PhoneNumber_countrycode}
            />
            <input type="hidden" name="Email" value={values.Email} />
            <input type="hidden" name="Radio" value={values.Radio} />
            <input type="hidden" name="Dropdown" value={values.Dropdown} />
            <input
              type="hidden"
              name="SingleLine6"
              value={values.SingleLine6}
            />
            <input type="checkbox" name="DecisionBox" checked={true} />
            <input type="hidden" name="Currency" value={values.Currency} />
            <input type="hidden" name="Currency1" value={values.Currency1} />
            <input type="hidden" name="Currency2" value={values.Currency2} />
            <input type="hidden" name="Currency3" value={values.Currency3} />
            <input type="hidden" name="MultiLine" value={values.MultiLine} />

            <FormGroup>
              <h2>Qual o perfil do imóvel que deseja cadastrar?</h2>
              <FormGroupFlex>
                <FormElements
                  name="SingleLine5"
                  type="radio"
                  label="Residencial"
                  size="big"
                  value="Residencial"
                  checked={values.SingleLine5 === 'Residencial'}
                  onChange={() => changeType('SingleLine5', 'Residencial')}
                  error={touched.SingleLine5 && errors.SingleLine5}
                />
                <FormElements
                  name="SingleLine5"
                  type="radio"
                  label="Comercial"
                  size="big"
                  value="Comercial"
                  checked={values.SingleLine5 === 'Comercial'}
                  onChange={() => changeType('SingleLine5', 'Comercial')}
                  error={touched.SingleLine5 && errors.SingleLine5}
                />
                <FormElements
                  name="SingleLine5"
                  type="radio"
                  label="Praia"
                  size="big"
                  value="Praia"
                  checked={values.SingleLine5 === 'Praia'}
                  onChange={() => changeType('SingleLine5', 'Praia')}
                  error={touched.SingleLine5 && errors.SingleLine5}
                />
                <FormElements
                  name="SingleLine5"
                  type="radio"
                  label="Campo"
                  size="big"
                  value="Campo"
                  checked={values.SingleLine5 === 'Campo'}
                  onChange={() => changeType('SingleLine5', 'Campo')}
                  error={touched.SingleLine5 && errors.SingleLine5}
                />
                <FormElements
                  name="SingleLine5"
                  type="radio"
                  label="Internacional"
                  size="big"
                  value="Internacional"
                  checked={values.SingleLine5 === 'Internacional'}
                  onChange={() => changeType('SingleLine5', 'Internacional')}
                  error={touched.SingleLine5 && errors.SingleLine5}
                />
              </FormGroupFlex>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <h2>O que você deseja?</h2>
                <FormGroupTwo>
                  <FormElements
                    name="finalityVender"
                    type="checkbox"
                    label="Vender"
                    onChange={() => {
                      setFieldValue('finalityVender', !values.finalityVender);
                      setFinality(
                        !values.finalityVender,
                        values.finalityAluguel
                      );
                      GTM.dataLayerPush({
                        event: 'Custom Field Change',
                        fieldLabel: 'O que você deseja?',
                        fieldForm: 'Cadastrar Imóvel',
                        fieldValMin: '',
                        fieldValMax: 'Vender',
                      });
                    }}
                    error={touched.finalityVender && errors.finalityVender}
                    value={values.finalityVender}
                    checked={values.finalityVender}
                    onBlur={handleBlur}
                  />
                  <FormElements
                    name="finalityAluguel"
                    type="checkbox"
                    label="Alugar"
                    onChange={() => {
                      setFieldValue('finalityAluguel', !values.finalityAluguel);
                      setFinality(
                        values.finalityVender,
                        !values.finalityAluguel
                      );
                      GTM.dataLayerPush({
                        event: 'Custom Field Change',
                        fieldLabel: 'O que você deseja?',
                        fieldForm: 'Cadastrar Imóvel',
                        fieldValMin: '',
                        fieldValMax: 'Alugar',
                      });
                    }}
                    error={touched.finalityAluguel && errors.finalityAluguel}
                    value={values.finalityAluguel}
                    checked={values.finalityAluguel}
                    onBlur={handleBlur}
                  />
                </FormGroupTwo>
              </FormGroup>

              <FormGroupRow>
                {cats && cats.length >= 0 ? (
                  <FormGroup>
                    <h2>Qual o tipo do imóvel?</h2>
                    <FormElements
                      name="SingleLine11"
                      type="select"
                      items={cats}
                      onChange={handleChange}
                      error={touched.SingleLine11 && errors.SingleLine11}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                ) : null}
                {values.SingleLine5 === 'Internacional' && (
                  <FormGroup>
                    <h2>Qual o país?</h2>
                    <FormElements
                      name="SingleLine8"
                      type="select"
                      items={optionsCountries}
                      onChange={(e) => {
                        handleChange(e);
                        // setKeyLocals(e.currentTarget.value);
                      }}
                      error={touched.SingleLine8 && errors.SingleLine8}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                )}
              </FormGroupRow>
            </FormRow>

            <FormGroup>
              <h2>Onde fica?</h2>
              <FormGroupAddress>
                <FormElements
                  name="SingleLine"
                  label="Rua"
                  placeholder="Rua"
                  onChange={handleChange}
                  error={touched.SingleLine && errors.SingleLine}
                  value={values.SingleLine}
                  onBlur={handleBlur}
                  className="holos-form-field"
                  data-label="Rua"
                  data-type="Cadastrar Imóvel"
                />
                <FormElements
                  name="SingleLine2"
                  label="Numero"
                  placeholder="Numero"
                  onChange={handleChange}
                  error={touched.SingleLine2 && errors.SingleLine2}
                  value={values.SingleLine2}
                  onBlur={handleBlur}
                  className="holos-form-field"
                  data-label="Número"
                  data-type="Cadastrar Imóvel"
                />
                <FormElements
                  name="SingleLine3"
                  label="Complemento"
                  placeholder="Complemento"
                  onChange={handleChange}
                  error={touched.SingleLine3 && errors.SingleLine3}
                  value={values.SingleLine3}
                  onBlur={handleBlur}
                  className="holos-form-field"
                  data-label="Complemento"
                  data-type="Cadastrar Imóvel"
                />
                {values.SingleLine5 === 'Internacional' && (
                  <FormElements
                    name="SingleLine4"
                    label="Cidade"
                    placeholder="Cidade"
                    onChange={handleChange}
                    error={touched.SingleLine4 && errors.SingleLine4}
                    value={values.SingleLine4}
                    onBlur={handleBlur}
                    className="holos-form-field"
                    data-label="Cidade"
                    data-type="Cadastrar Imóvel"
                  />
                )}
                {values.SingleLine5 === 'Praia' && (
                  <FormElements
                    name="SingleLine9"
                    label="Praia"
                    placeholder="Praia"
                    onChange={handleChange}
                    error={touched.SingleLine9 && errors.SingleLine9}
                    value={values.SingleLine9}
                    onBlur={handleBlur}
                    className="holos-form-field"
                    data-label="Praia"
                    data-type="Cadastrar Imóvel"
                  />
                )}
                {values.SingleLine5 === 'Campo' && (
                  <FormElements
                    name="SingleLine10"
                    label="Condomínio"
                    placeholder="Condomínio"
                    onChange={handleChange}
                    error={touched.SingleLine10 && errors.SingleLine10}
                    value={values.SingleLine10}
                    onBlur={handleBlur}
                    className="holos-form-field"
                    data-label="Condomínio"
                    data-type="Cadastrar Imóvel"
                  />
                )}
                {values.SingleLine5 !== 'Praia' &&
                  values.SingleLine5 !== 'Campo' &&
                  values.SingleLine5 !== 'Internacional' && (
                    <FormElements
                      name="SingleLine7"
                      placeholder="Bairro"
                      label="Bairro"
                      type="select"
                      items={localsByKey}
                      message="* Por enquanto atuamos apenas nestes bairros"
                      onChange={handleChange}
                      error={touched.SingleLine7 && errors.SingleLine7}
                      value={values.SingleLine7}
                      onBlur={handleBlur}
                      className="holos-form-field"
                      data-label="Bairro"
                      data-type="Cadastrar Imóvel"
                    />
                  )}
              </FormGroupAddress>
            </FormGroup>

            <FormGroup>
              <h2>Como é o seu imóvel</h2>
              <FormGroupFlex>
                <FormElements
                  type="number"
                  name="Number2"
                  label="Área útil (m²)"
                  placeholder="Área útil (m²)"
                  onChange={handleChange}
                  error={touched.Number2 && errors.Number2}
                  value={values.Number2}
                  onBlur={handleBlur}
                  className="holos-form-field"
                  data-label="Área útil (m²)"
                  data-type="Cadastrar Imóvel"
                />
                {values.SingleLine5 !== 'Comercial' && (
                  <>
                    <FormElements
                      type="number"
                      name="Number"
                      label="Dormitórios"
                      placeholder="Dormitórios"
                      onChange={handleChange}
                      error={touched.Number && errors.Number}
                      value={values.Number}
                      onBlur={handleBlur}
                      className="holos-form-field"
                      data-label="Dormitórios"
                      data-type="Cadastrar Imóvel"
                    />
                  </>
                )}
                <FormElements
                  type="number"
                  name="Number1"
                  label="Vagas de garagem"
                  placeholder="Vagas de garagem"
                  onChange={handleChange}
                  error={touched.Number1 && errors.Number1}
                  value={values.Number1}
                  onBlur={handleBlur}
                  className="holos-form-field"
                  data-label="Vagas de garagem"
                  data-type="Cadastrar Imóvel"
                />
              </FormGroupFlex>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <h2>Já está vago?</h2>
                <FormGroupFlex>
                  <FormElements
                    name="SingleLine12"
                    type="checkbox"
                    label="Não"
                    size="big"
                    value="Não"
                    checked={values.SingleLine12 === 'Não'}
                    onChange={() => {
                      setFieldValue('SingleLine12', 'Não');
                      GTM.dataLayerPush({
                        event: 'Custom Field Change',
                        fieldLabel: 'Já está vago?',
                        fieldForm: 'Cadastrar Imóvel',
                        fieldValMin: '',
                        fieldValMax: 'Não',
                      });
                    }}
                    error={touched.SingleLine12 && errors.SingleLine12}
                  />
                  <FormElements
                    name="SingleLine12"
                    type="checkbox"
                    label="Sim"
                    size="big"
                    value="Sim"
                    checked={values.SingleLine12 === 'Sim'}
                    onChange={() => {
                      setFieldValue('SingleLine12', 'Sim');
                      GTM.dataLayerPush({
                        event: 'Custom Field Change',
                        fieldLabel: 'Já está vago?',
                        fieldForm: 'Cadastrar Imóvel',
                        fieldValMin: '',
                        fieldValMax: 'Sim',
                      });
                    }}
                    error={touched.SingleLine12 && errors.SingleLine12}
                  />
                </FormGroupFlex>
              </FormGroup>

              <FormGroup>
                <h2>As chaves ficam com quem?</h2>
                <FormElements
                  name="SingleLine13"
                  label="Nome"
                  placeholder="Nome"
                  onChange={handleChange}
                  error={touched.SingleLine13 && errors.SingleLine13}
                  value={values.SingleLine13}
                  onBlur={handleBlur}
                  className="holos-form-field"
                  data-label="As chaves ficam com quem?"
                  data-type="Cadastrar Imóvel"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <h2>Valores do imóvel</h2>
              <FormGroupValues>
                {values.finalityVender && (
                  <FormElements
                    type="currency"
                    name="Currency_copy"
                    label="Qual o valor de venda pedido?"
                    placeholder="R$"
                    onChange={(event) => {
                      const currency = event.target.value;
                      setFieldValue('Currency_copy', currency);
                      setFieldValue(
                        'Currency',
                        currency.replace('R$', '').replace(/[.]/g, '')
                      );
                    }}
                    message="(Incluindo 6% de comissão)"
                    error={touched.Currency_copy && errors.Currency_copy}
                    value={values.Currency_copy}
                    onBlur={handleBlur}
                    className="holos-form-field"
                    data-label="Qual o valor de venda pedido?"
                    data-type="Cadastrar Imóvel"
                  />
                )}

                {values.finalityAluguel && (
                  <FormElements
                    type="currency"
                    name="Currency1"
                    label="Qual o valor de aluguel pedido?"
                    placeholder="R$"
                    message={
                      values.SingleLine5 !== 'Residencial'
                        ? 'Incluindo comissão (primeiro aluguel)'
                        : ''
                    }
                    onChange={(event) => {
                      const currency = event.target.value;
                      setFieldValue('Currency1_copy', currency);
                      setFieldValue(
                        'Currency1',
                        currency.replace('R$', '').replace(/[.]/g, '')
                      );
                    }}
                    error={touched.Currency1 && errors.Currency1}
                    value={values.Currency1}
                    onBlur={handleBlur}
                    className="holos-form-field"
                    data-label="Qual o valor de aluguel pedido?"
                    data-type="Cadastrar Imóvel"
                  />
                )}

                {values.SingleLine5 !== 'Internacional' && (
                  <FormGroupValuesSub>
                    <FormElements
                      type="currency"
                      name="Currency3"
                      label="Valor mensal de IPTU"
                      placeholder="R$"
                      onChange={(event) => {
                        const currency = event.target.value;
                        setFieldValue('Currency3_copy', currency);
                        setFieldValue(
                          'Currency3',
                          currency.replace('R$', '').replace(/[.]/g, '')
                        );
                      }}
                      error={touched.Currency3 && errors.Currency3}
                      value={values.Currency3}
                      onBlur={handleBlur}
                      className="holos-form-field"
                      data-label="Valor mensal de IPTU"
                      data-type="Cadastrar Imóvel"
                    />
                    {values.SingleLine11 !== 'Casa' && (
                      <FormElements
                        type="currency"
                        name="Currency2"
                        label="Valor do condomínio"
                        placeholder="R$"
                        onChange={(event) => {
                          const currency = event.target.value;
                          setFieldValue('Currency2_copy', currency);
                          setFieldValue(
                            'Currency2',
                            currency.replace('R$', '').replace(/[.]/g, '')
                          );
                        }}
                        error={touched.Currency2 && errors.Currency2}
                        value={values.Currency2}
                        onBlur={handleBlur}
                        className="holos-form-field"
                        data-label="Valor do condomínio"
                        data-type="Cadastrar Imóvel"
                      />
                    )}
                  </FormGroupValuesSub>
                )}
              </FormGroupValues>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <h2 className="minheight">
                  O que há de melhor em seu imóvel? Capricha.
                </h2>
                <FormElements
                  type="area"
                  name="MultiLine2"
                  placeholder="Digite sua mensagem"
                  onChange={handleChange}
                  error={touched.MultiLine2 && errors.MultiLine2}
                  value={values.MultiLine2}
                  onBlur={handleBlur}
                  className="holos-form-field"
                  data-label="O que há de melhor em seu imóvel? Capricha."
                  data-type="Cadastrar Imóvel"
                />
              </FormGroup>

              <FormGroup>
                <h2 className="minheight">O que há de problema?</h2>
                <FormElements
                  type="area"
                  name="MultiLine1"
                  placeholder="Digite sua mensagem"
                  onChange={handleChange}
                  error={touched.MultiLine1 && errors.MultiLine1}
                  value={values.MultiLine1}
                  onBlur={handleBlur}
                  className="holos-form-field"
                  data-label="O que há de problema?"
                  data-type="Cadastrar Imóvel"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <h2>FOTOS</h2>
              <FormGroupPhotos>
                <Description>
                  Hora de enviar as fotos do seu imóvel. Pode ser do celular
                  mesmo, é só para gente ter uma ideia e planejar a sessão com o
                  fotógrafo.
                </Description>

                <FormElements
                  type="file"
                  multiple
                  onChange={(e) => {
                    const imagesArr = [ ...values.images, ...e.target.files ];
                    setFieldValue('images', imagesArr);
                    GTM.dataLayerPush({
                      event: 'Custom Field Change',
                      fieldLabel: 'Fotos',
                      fieldForm: 'Cadastrar Imóvel',
                      fieldValMin: '',
                      fieldValMax: imagesArr.map((img) => img.name).join(', '),
                    });
                  }}
                ></FormElements>
              </FormGroupPhotos>
              <GroupImages>
                {values.images.length > 0 &&
                  values.images.map((imgSrc, index) => {
                    return (
                      <GroupImage key={`groupimg-${index}`}>
                        <SVG
                          src={CloseIconSVG}
                          uniquifyIDs={true}
                          onClick={() => handleRemoveImage(index)}
                        />
                        <Image
                          alt={imgSrc.name}
                          src={URL.createObjectURL(imgSrc)}
                        />
                      </GroupImage>
                    );
                  })}
              </GroupImages>
            </FormGroup>

            <FormGroupFooter>
              {/* <CheckLinkTerms
                type="checkboxLink"
                name="terms"
                label="Concordo com o termo de autorização de comercialização de imóveis"
                onChange={() => setFieldValue('terms', !values.terms)}
                error={touched.terms && errors.terms}
                value={values.terms}
                checked={values.terms}
                onBlur={handleBlur}
              /> */}

              <UserInfo layout="register-property" />

              <ButtonSubmit
                disabled={isSubmitting}
                type="submit"
                className="holos-form-submit"
                data-type="Cadastrar Imóvel"
              >
                Enviar
              </ButtonSubmit>
            </FormGroupFooter>
          </Form>
        </Body>
        <Contact />
      </Container>
    </>
  );
}

Register.getInitialProps = async ({ query }) => {
  const locals = await Api.Search.getLocals();
  const categories = await Api.Search.getCategories();
  const countries = await Api.Search.getFilters('?source=internacional');
  const itemBase = { label: 'Selecione', value: '' };

  const newContries = [ itemBase ];
  Object.keys(countries.locals).map((x) =>
    newContries.push({ label: x, value: x })
  );

  return {
    locals: locals,
    countries: newContries,
    categories,
  };
};

export default Register;
