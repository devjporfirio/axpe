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
import SeoData from 'helpers/seo';

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
  CheckLinkTerms,
  ButtonSubmit
} from 'pages/Register/styles';

const registrySchema = Yup.object().shape({
  Dropdown2: Yup.string()
    .oneOf([ 'Residencial', 'Comercial', 'Praia', 'Campo', 'Internacional' ])
    .required(),
  Dropdown1: Yup.string().required(),
  DecisionBox: Yup.string().required(),
  Radio: Yup.string().required(),
  Name_First: Yup.string().required(),
  Name_Last: Yup.string().required(),
  PhoneNumber_countrycode: Yup.string().required(),
  Email: Yup.string().required(),
  Dropdown4: Yup.string(),
  SingleLine: Yup.string().required(),
  SingleLine2: Yup.string().required(),
  SingleLine3: Yup.string(),
  SingleLine4: Yup.string(),
  Dropdown3: Yup.string().required(),
  Dropdown7: Yup.string(),
  Number2: Yup.string().required(),
  Number: Yup.string(),
  Number1: Yup.string().required(),
  Radio1: Yup.string().required(),
  Currency: Yup.string().required(),
  Currency_copy: Yup.string().required(),
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
  images: Yup.array(),
  terms: Yup.boolean().oneOf([ true ]).required()
});

function Register({ locals, categories, countries }) {
  const dispatch = useDispatch();
  const refForm = useRef(null);
  const user = useSelector(state => state.user);
  const [ keyLocals, setKeyLocals ] = useState('São Paulo');
  const [ cats, setCats ] = useState([]);
  const [ localsByKey, setLocalsByKey ] = useState([
    { label: 'Selecione', value: '' }
  ]);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    touched,
    errors,
    setFieldValue
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
      Dropdown1: 'Venda e Locação', // Tipo de Comercialização - Apenas Venda, Apenas Locação ou Venda e Locação
      Dropdown2: '', // Categoria do Imóvel - Residencial em SP, Comercial em SP, Praia, Campo ou Internacional
      DecisionBox: true,
      Radio: true,
      Name_First: user.me.name,
      Name_Last: user.me.lastName,
      PhoneNumber_countrycode: user.me.phone,
      Email: user.me.email,
      Dropdown4: '', // Tipo do Imóvel - Apartamento, Casa, Cobertura, Conjunto, etc
      SingleLine: '', // Endereço
      SingleLine2: '', // Número
      SingleLine3: '', // Complemento
      SingleLine4: '', // Cidade
      Dropdown3: '', // Bairros
      Dropdown7: '', // País
      Number2: '', // Area util
      Number: '', // Quartos
      Number1: '', // Vagas
      Radio1: '', // Imóvel vago? Sim ou Não
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
      finalityVender: true,
      finalityAluguel: true,
      images: [],
      terms: false
    },
    validationSchema: registrySchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      values.Currency = values.Currency.replace('R$', '');
      values.Currency2 = values.Currency2.replace('R$', '');

      setTimeout(() => {
        refForm.current.submit();
      }, 1000);
    }
  });

  useEffect(() => {
    async function loadMe() {
      if (user && user.logged) {
        dispatch(setMain({ modalLogin: false }));
        setFieldValue('Name_First', user.me.name);
        setFieldValue('Name_Last', user.me.lastName);
        setFieldValue('PhoneNumber_countrycode', user.me.phone);
        setFieldValue('Email', user.me.email);
      } else {
        dispatch(setMain({ modalLogin: true }));
      }
    }

    loadMe();
  }, [ user ]);

  useEffect(() => {
    const key = keyLocals || 'São Paulo';
    const newLocals = [{ label: 'Selecione', value: '' }].concat(
      locals[key].map(y => ({ label: y.local, value: y.local }))
    );

    setLocalsByKey(newLocals);
  }, [ keyLocals ]);

  useEffect(() => {
    let newCats = categories &&
    Object.keys(categories).length > 0 && values.Dropdown2 ? categories[values.Dropdown2.toUpperCase()] : null;

    if(newCats) {
      newCats = [{ label: 'Selecione', value: '' }].concat(
        categories[values.Dropdown2.toUpperCase()].map(x => ({
          label: x,
          value: x
        }))
      );
    }

    setCats(newCats);
  }, [ categories, values ]);

  const handleRemoveImage = useCallback(position => {
    const newList = [ ...values.images ];

    newList.splice(position, 1);

    const imagesNames = newList.map(img => img.name);

    setFieldValue('images', newList);
    setFieldValue('MultiLine', imagesNames.join(', '));
  }, [ values ]);

  const setFinality = useCallback((sell, rent) => {
    const arr = [];

    if(sell) {
      arr.push('Venda')
    }

    if(rent) {
      arr.push('Locação')
    }

    setFieldValue('Dropdown1', arr.length ? arr.join(' e ') : '');
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
          <Form ref={refForm} action="https://forms.zohopublic.com/axpeimoveis1/form/SITECADASTROGERAL/formperma/kS1k-h1kXXOhkZbL-r5ZJvV0cpaVSWVg-cm5AoLytbg/htmlRecords/submit" method="POST" accept-charset="UTF-8" enctype="multipart/form-data" onSubmit={handleSubmit}>
            <input type="hidden" name="zf_referrer_name" value={values.zf_referrer_name} />
            <input type="hidden" name="zf_redirect_url" value={values.zf_redirect_url} />
            <input type="hidden" name="zc_gad" value={values.zc_gad} />
            <input type="hidden" name="utm_source" value={values.utm_source} />
            <input type="hidden" name="utm_medium" value={values.utm_medium} />
            <input type="hidden" name="utm_campaign" value={values.utm_campaign} />
            <input type="hidden" name="utm_term" value={values.utm_term} />
            <input type="hidden" name="utm_content" value={values.utm_content} />
            <input type="hidden" name="Name_First" value={values.Name_First} />
            <input type="hidden" name="Name_Last" value={values.Name_Last} />
            <input type="hidden" name="PhoneNumber_countrycode" value={values.PhoneNumber_countrycode} />
            <input type="hidden" name="Email" value={values.Email} />
            <input type="hidden" name="Currency" value={values.Currency} />
            <input type="hidden" name="Currency1" value={values.Currency1} />
            <input type="hidden" name="Currency2" value={values.Currency2} />
            <input type="hidden" name="Currency3" value={values.Currency3} />

            <FormGroup>
              <h2>Qual o perfil do imóvel que deseja cadastrar?</h2>
              <FormGroupFlex>
                <FormElements
                  name="Dropdown2"
                  type="checkbox"
                  label="Residencial"
                  size="big"
                  checked={values.Dropdown2 === 'Residencial'}
                  onChange={() => setFieldValue('Dropdown2', 'Residencial')}
                  error={touched.Dropdown2 && errors.Dropdown2}
                />
                <FormElements
                  name="Dropdown2"
                  type="checkbox"
                  label="Comercial"
                  size="big"
                  checked={values.Dropdown2 === 'Comercial'}
                  onChange={() => setFieldValue('Dropdown2', 'Comercial')}
                  error={touched.Dropdown2 && errors.Dropdown2}
                />
                <FormElements
                  name="Dropdown2"
                  type="checkbox"
                  label="Praia"
                  size="big"
                  checked={values.Dropdown2 === 'Praia'}
                  onChange={() => setFieldValue('Dropdown2', 'Praia')}
                  error={touched.Dropdown2 && errors.Dropdown2}
                />
                <FormElements
                  name="Dropdown2"
                  type="checkbox"
                  label="Campo"
                  size="big"
                  checked={values.Dropdown2 === 'Campo'}
                  onChange={() => setFieldValue('Dropdown2', 'Campo')}
                  error={touched.Dropdown2 && errors.Dropdown2}
                />
                <FormElements
                  name="Dropdown2"
                  type="checkbox"
                  label="Internacional"
                  size="big"
                  checked={values.Dropdown2 === 'Internacional'}
                  onChange={() => setFieldValue('Dropdown2', 'Internacional')}
                  error={touched.Dropdown2 && errors.Dropdown2}
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
                      setFinality(!values.finalityVender, values.finalityAluguel);
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
                      setFinality(values.finalityVender, !values.finalityAluguel);
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
                      name="Dropdown4"
                      type="select"
                      items={cats}
                      onChange={handleChange}
                      error={touched.Dropdown4 && errors.Dropdown4}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                ) : null}
                {values.Dropdown2 === 'Internacional' && (
                  <FormGroup>
                    <h2>Qual o país?</h2>
                    <FormElements
                      name="Dropdown7"
                      type="select"
                      items={countries}
                      onChange={e => {
                        handleChange(e);
                        setKeyLocals(e.currentTarget.value);
                      }}
                      error={touched.Dropdown7 && errors.Dropdown7}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                )}
              </FormGroupRow>
            </FormRow>

            <FormGroup>
              <h2>Qual o endereço?</h2>
              <FormGroupAddress>
                <FormElements
                  name="SingleLine"
                  label="Rua"
                  placeholder="Rua"
                  onChange={handleChange}
                  error={touched.SingleLine && errors.SingleLine}
                  value={values.SingleLine}
                  onBlur={handleBlur}
                />
                <FormElements
                  name="SingleLine2"
                  label="Numero"
                  placeholder="Numero"
                  onChange={handleChange}
                  error={touched.SingleLine2 && errors.SingleLine2}
                  value={values.SingleLine2}
                  onBlur={handleBlur}
                />
                <FormElements
                  name="SingleLine3"
                  label="Complemento"
                  placeholder="Complemento"
                  onChange={handleChange}
                  error={touched.SingleLine3 && errors.SingleLine3}
                  value={values.SingleLine3}
                  onBlur={handleBlur}
                />
                <FormElements
                  name="SingleLine4"
                  label="Cidade"
                  placeholder="Cidade"
                  onChange={handleChange}
                  error={touched.SingleLine4 && errors.SingleLine4}
                  value={values.SingleLine4}
                  onBlur={handleBlur}
                />
                <FormElements
                  name="Dropdown3"
                  placeholder="Bairro"
                  label="Bairro"
                  type="select"
                  items={localsByKey}
                  message="* Por enquanto atuamos apenas nestes bairros"
                  onChange={handleChange}
                  error={touched.Dropdown3 && errors.Dropdown3}
                  value={values.Dropdown3}
                  onBlur={handleBlur}
                />
              </FormGroupAddress>
            </FormGroup>

            <FormGroup>
              <h2>Características do imóvel</h2>
              <FormGroupFlex>
                <FormElements
                  name="Number2"
                  label="Área útil (m²)"
                  placeholder="Área útil (m²)"
                  onChange={handleChange}
                  error={touched.Number2 && errors.Number2}
                  value={values.Number2}
                  onBlur={handleBlur}
                />
                {values.Dropdown2 === 'Residencial' && (
                  <>
                    <FormElements
                      name="Number"
                      label="Dormitórios"
                      placeholder="Dormitórios"
                      onChange={handleChange}
                      error={touched.Number && errors.Number}
                      value={values.Number}
                      onBlur={handleBlur}
                    />
                  </>
                )}
                <FormElements
                  name="Number1"
                  label="Vagas de garagem"
                  placeholder="Vagas de garagem"
                  onChange={handleChange}
                  error={touched.Number1 && errors.Number1}
                  value={values.Number1}
                  onBlur={handleBlur}
                />
              </FormGroupFlex>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <h2>O imóvel está vago?</h2>
                <FormGroupFlex>
                  <FormElements
                    name="Radio1"
                    type="checkbox"
                    label="Não"
                    size="big"
                    checked={values.Radio1 === 'Não'}
                    onChange={() => setFieldValue('Radio1', 'Não')}
                    error={touched.Radio1 && errors.Radio1}
                  />
                  <FormElements
                    name="Radio1"
                    type="checkbox"
                    label="Sim"
                    size="big"
                    checked={values.Radio1 === 'Sim'}
                    onChange={() => setFieldValue('Radio1', 'Sim')}
                    error={touched.Radio1 && errors.Radio1}
                  />
                </FormGroupFlex>
              </FormGroup>

              {/* <FormGroup>
                <h2>Com quem ficam as chaves?</h2>
                <FormElements
                  name="managerKey"
                  label="Nome"
                  placeholder="Nome"
                  onChange={handleChange}
                  error={touched.managerKey && errors.managerKey}
                  value={values.managerKey}
                  onBlur={handleBlur}
                />
              </FormGroup> */}
            </FormRow>

            <FormGroup>
              <h2>Valores do imóvel</h2>
              <FormGroupValues>
                {values.finalityVender && (
                  <FormElements
                    type="currency"
                    name="Currency_copy"
                    label="Qual o valor de venda que gostaria?"
                    placeholder="R$"
                    onChange={event => {
                      const currency = event.target.value;
                      setFieldValue('Currency_copy', currency)
                      setFieldValue('Currency', currency.replace('R$', '').replace(/[.]/g, ''))
                    }}
                    message="(Incluindo 6% de comissão)"
                    error={touched.Currency_copy && errors.Currency_copy}
                    value={values.Currency_copy}
                    onBlur={handleBlur}
                  />
                )}

                {values.finalityAluguel && (
                  <FormElements
                    type="currency"
                    name="Currency1"
                    label="Qual o valor de aluguel que gostaria?"
                    placeholder="R$"
                    message={
                      values.Dropdown2 !== 'Residencial'
                        ? 'Incluindo comissão (primeiro aluguel)'
                        : ''
                    }
                    onChange={event => {
                      const currency = event.target.value;
                      setFieldValue('Currency1_copy', currency)
                      setFieldValue('Currency1', currency.replace('R$', '').replace(/[.]/g, ''))
                    }}
                    error={touched.Currency1 && errors.Currency1}
                    value={values.Currency1}
                    onBlur={handleBlur}
                  />
                )}

                {values.Dropdown2 !== 'Internacional' && (
                  <FormGroupValuesSub>
                    <FormElements
                      type="currency"
                      name="Currency3"
                      label="Valor mensal de IPTU"
                      placeholder="R$"
                      onChange={event => {
                        const currency = event.target.value;
                        setFieldValue('Currency3_copy', currency)
                        setFieldValue('Currency3', currency.replace('R$', '').replace(/[.]/g, ''))
                      }}
                      error={touched.Currency3 && errors.Currency3}
                      value={values.Currency3}
                      onBlur={handleBlur}
                    />
                    {values.Dropdown4 !== 'Casa' && (
                      <FormElements
                        type="currency"
                        name="Currency2"
                        label="Qual o valor do condomínio"
                        placeholder="R$"
                        onChange={event => {
                          const currency = event.target.value;
                          setFieldValue('Currency2_copy', currency)
                          setFieldValue('Currency2', currency.replace('R$', '').replace(/[.]/g, ''))
                        }}
                        error={touched.Currency2 && errors.Currency2}
                        value={values.Currency2}
                        onBlur={handleBlur}
                      />
                    )}
                  </FormGroupValuesSub>
                )}
              </FormGroupValues>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <h2>O que o seu imóvel tem de melhor?</h2>
                <FormElements
                  type="area"
                  name="MultiLine2"
                  placeholder="Digite sua mensagem"
                  onChange={handleChange}
                  error={touched.MultiLine2 && errors.MultiLine2}
                  value={values.MultiLine2}
                  onBlur={handleBlur}
                />
              </FormGroup>

              <FormGroup>
                <h2>Há algum ponto problemático no imóvel?</h2>
                <FormElements
                  type="area"
                  name="MultiLine1"
                  placeholder="Digite sua mensagem"
                  onChange={handleChange}
                  error={touched.MultiLine1 && errors.MultiLine1}
                  value={values.MultiLine1}
                  onBlur={handleBlur}
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <h2>FOTOS</h2>
              <FormGroupPhotos>
                <Description>
                  Por favor, envie algumas fotos que podem ser tiradas com o seu
                  celular. Elas nos ajudarão a planejar a sessão de fotos que
                  faremos no seu imóvel.
                </Description>

                {values.MultiLine}

                <FormElements
                  type="file"
                  multiple
                  onChange={e => {
                    const imagesArr = [ ...values.images, ...e.target.files ];
                    const imagesNames = imagesArr.map(img => img.name);
                    setFieldValue('images', imagesArr);
                    setFieldValue('MultiLine', imagesNames.join(', '));
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
              <CheckLinkTerms
                type="checkboxLink"
                name="terms"
                label="Concordo com o termo de autorização de comercialização de imóveis"
                onChange={() => setFieldValue('terms', !values.terms)}
                error={touched.terms && errors.terms}
                value={values.terms}
                checked={values.terms}
                onBlur={handleBlur}
              />

              <UserInfo layout="register-property" />

              <ButtonSubmit disabled={isSubmitting} type="submit">
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
  Object.keys(countries.locals).map(x => newContries.push({ label: x, value: x }));

  return {
    locals: locals,
    countries: newContries,
    categories
  };
};

export default Register;
