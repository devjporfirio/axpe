import React, { useState, useEffect } from 'react';
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
import InfoUser from 'components/InfoUser';

// helpers
import SeoData from 'helpers/seo';

// actions
import { setMain } from 'store/modules/main/actions';

// images
import IClose from 'assets/icons/close-white';

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
  FormGroupAddress,
  FormGroupPhotos,
  Description,
  GroupImages,
  GroupImage,
  Image,
  FormGroupFooter,
  CheckLinkTerms,
  ButtonSubmit
} from 'pages/RegisterForm/styles';

const registrySchema = Yup.object().shape({
  type: Yup.string()
    .oneOf([ 'Residencial', 'Comercial', 'Praia', 'Campo', 'Internacional' ])
    .required(),
  finalityVender: Yup.string().required(),
  finalityAluguel: Yup.string().required(),
  category: Yup.string().required(),
  zipcode: Yup.string().required(),
  address: Yup.string().required(),
  number: Yup.number().required(),
  complement: Yup.string().required(),
  neighborhood: Yup.string().required(),
  areaUseful: Yup.number().required(),
  numDorms: Yup.number(),
  numSuites: Yup.number(),
  numParking: Yup.number().required(),
  isVacant: Yup.boolean().required(),
  managerKey: Yup.string().required(),
  valueRent: Yup.string().required(),
  valueSell: Yup.string().required(),
  valueTax: Yup.string().required(),
  valueCondo: Yup.string().required(),
  positiveCharacteristics: Yup.string().required(),
  negativeCharacteristics: Yup.string().required(),
  images: Yup.array(),
  terms: Yup.boolean()
    .oneOf([ true ])
    .required()
});

function RegisterForm({ locals, categories, pais, type }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [ keyLocals, setKeyLocals ] = useState('São Paulo');
  const [ localsByKey, setLocalsByKey ] = useState([
    { label: 'Selecione', value: '' }
  ]);

  useEffect(() => {
    async function loadMe() {
      if (user && user.logged) {
        dispatch(setMain({ modalLogin: false }));
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
      type: type || '',
      finalityVender: true,
      finalityAluguel: true,
      category: '',
      zipcode: '',
      address: '',
      number: '',
      complement: '',
      neighborhood: '',
      areaUseful: '',
      numDorms: '',
      numSuites: '',
      numParking: '',
      isVacant: '',
      managerKey: '',
      valueRent: '',
      valueSell: '',
      valueTax: '',
      valueCondo: '',
      positiveCharacteristics: '',
      negativeCharacteristics: '',
      images: [],
      terms: false
    },
    validationSchema: registrySchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      values.finality = `${values.finalityAluguel ? 'Aluguel' : ''}${
        values.finalityVender
          ? values.finalityAluguel
            ? ',Vender'
            : 'Vender'
          : ''
      }`;
      const response = await Api.RegisterProperty.postProperty(
        user.access_token,
        values
      );
      setSubmitting(false);
      if (response.status) {
        dispatch(
          setMain({
            modalRegisterSuccess: true
          })
        );
        resetForm({});
      }
    }
  });

  const handleRemoveImage = position => {
    const newList = [ ...values.images ];
    newList.splice(position, 1);
    setFieldValue('images', newList);
  };

  const newCategories =
    categories &&
    Object.keys(categories).length > 0 &&
    categories[values.type.toUpperCase()]
      ? [{ label: 'Selecione', value: '' }].concat(
          categories[values.type.toUpperCase()].map(x => ({
            label: x,
            value: x
          }))
        )
      : [{ label: 'Selecione', value: '' }];

  return (
    <>
      <Head>
        <title>{`Cadastre seu imóvel - ${type} - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        <BlockHighlighted type="registerProperty" propertyType={type} />
        <Body>
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <h2>O que você deseja?</h2>
                <FormGroupTwo>
                  <FormElements
                    name="finalityVender"
                    type="checkbox"
                    label="Vender"
                    onChange={() =>
                      setFieldValue('finalityVender', !values.finalityVender)
                    }
                    error={touched.finalityVender && errors.finalityVender}
                    value={values.finalityVender}
                    checked={values.finalityVender}
                    onBlur={handleBlur}
                  />
                  <FormElements
                    name="finalityAluguel"
                    type="checkbox"
                    label="Alugar"
                    onChange={() =>
                      setFieldValue('finalityAluguel', !values.finalityAluguel)
                    }
                    error={touched.finalityAluguel && errors.finalityAluguel}
                    value={values.finalityAluguel}
                    checked={values.finalityAluguel}
                    onBlur={handleBlur}
                  />
                </FormGroupTwo>
              </FormGroup>

              <FormGroupRow>
                <FormGroup>
                  <h2>Qual o tipo do imóvel?</h2>
                  <FormElements
                    name="category"
                    type="select"
                    items={newCategories}
                    onChange={handleChange}
                    error={touched.category && errors.category}
                    onBlur={handleBlur}
                  />
                </FormGroup>
                {values.type === 'Internacional' && (
                  <FormGroup>
                    <h2>Qual o país?</h2>
                    <FormElements
                      name="pais"
                      type="select"
                      items={pais}
                      onChange={e => {
                        handleChange(e);
                        setKeyLocals(e.currentTarget.value);
                      }}
                      error={touched.pais && errors.pais}
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
                  type="cep"
                  name="zipcode"
                  label="CEP"
                  placeholder="CEP"
                  onChange={handleChange}
                  error={touched.zipcode && errors.zipcode}
                  value={values.zipcode}
                  onBlur={handleBlur}
                />
                <FormElements
                  name="address"
                  label="Rua"
                  placeholder="Rua"
                  onChange={handleChange}
                  error={touched.address && errors.address}
                  value={values.address}
                  onBlur={handleBlur}
                />
                <FormElements
                  name="number"
                  label="Numero"
                  placeholder="Numero"
                  onChange={handleChange}
                  error={touched.number && errors.number}
                  value={values.number}
                  onBlur={handleBlur}
                />
                <FormElements
                  name="complement"
                  label="Complemento"
                  placeholder="Complemento"
                  onChange={handleChange}
                  error={touched.complement && errors.complement}
                  value={values.complement}
                  onBlur={handleBlur}
                />
                <FormElements
                  name="neighborhood"
                  placeholder="Bairro"
                  label="Bairro"
                  type="select"
                  items={localsByKey}
                  message="* Por enquanto atuamos apenas nestes bairros"
                  onChange={handleChange}
                  error={touched.neighborhood && errors.neighborhood}
                  value={values.neighborhood}
                  onBlur={handleBlur}
                />
              </FormGroupAddress>
            </FormGroup>

            <FormGroup>
              <h2>Características do imóvel</h2>
              <FormGroupFlex>
                <FormElements
                  name="areaUseful"
                  label="Área útil (m²)"
                  placeholder="Área útil (m²)"
                  onChange={handleChange}
                  error={touched.areaUseful && errors.areaUseful}
                  value={values.areaUseful}
                  onBlur={handleBlur}
                />
                {values.type === 'Residencial' && (
                  <>
                    <FormElements
                      name="numDorms"
                      label="Dormitórios"
                      placeholder="Dormitórios"
                      onChange={handleChange}
                      error={touched.numDorms && errors.numDorms}
                      value={values.numDorms}
                      onBlur={handleBlur}
                    />
                    <FormElements
                      name="numSuites"
                      label="Sendo suítes"
                      placeholder="Sendo suítes"
                      onChange={handleChange}
                      error={touched.numSuites && errors.numSuites}
                      value={values.numSuites}
                      onBlur={handleBlur}
                    />
                  </>
                )}
                <FormElements
                  name="numParking"
                  label="Vagas de garagem"
                  placeholder="Vagas de garagem"
                  onChange={handleChange}
                  error={touched.numParking && errors.numParking}
                  value={values.numParking}
                  onBlur={handleBlur}
                />
              </FormGroupFlex>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <h2>O imóvel está vago?</h2>
                <FormGroupFlex>
                  <FormElements
                    name="isVacant"
                    type="checkbox"
                    label="Não"
                    size="big"
                    checked={values.isVacant === false}
                    onChange={() => setFieldValue('isVacant', false)}
                    error={touched.isVacant && errors.isVacant}
                  />
                  <FormElements
                    name="isVacant"
                    type="checkbox"
                    label="Sim"
                    size="big"
                    checked={values.isVacant}
                    onChange={() => setFieldValue('isVacant', true)}
                    error={touched.isVacant && errors.isVacant}
                  />
                </FormGroupFlex>
              </FormGroup>

              <FormGroup>
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
              </FormGroup>
            </FormRow>

            <FormGroup>
              <h2>Valores do imóvel</h2>
              <FormGroupValues>
                {values.finalityVender && (
                  <FormElements
                    type="currency"
                    name="valueSell"
                    label="Qual o valor de venda que gostaria?"
                    placeholder="R$"
                    onChange={handleChange}
                    message="(Incluindo 6% de comissão)"
                    error={touched.valueSell && errors.valueSell}
                    value={values.valueSell}
                    onBlur={handleBlur}
                  />
                )}

                {values.finalityAluguel && (
                  <FormElements
                    type="currency"
                    name="valueRent"
                    label="Qual o valor de aluguel que gostaria?"
                    placeholder="R$"
                    message={
                      values.type !== 'Residencial'
                        ? 'Incluindo comissão (primeiro aluguel)'
                        : ''
                    }
                    onChange={handleChange}
                    error={touched.valueRent && errors.valueRent}
                    value={values.valueRent}
                    onBlur={handleBlur}
                  />
                )}

                {values.type !== 'Internacional' && (
                  <>
                    <FormElements
                      type="currency"
                      name="valueTax"
                      label="Valor mensal de IPTU"
                      placeholder="R$"
                      onChange={handleChange}
                      error={touched.valueTax && errors.valueTax}
                      value={values.valueTax}
                      onBlur={handleBlur}
                    />
                    {values.category !== 'Casa' && (
                      <FormElements
                        type="currency"
                        name="valueCondo"
                        label="Qual o valor do condomínio"
                        placeholder="R$"
                        onChange={handleChange}
                        error={touched.valueCondo && errors.valueCondo}
                        value={values.valueCondo}
                        onBlur={handleBlur}
                      />
                    )}
                  </>
                )}
              </FormGroupValues>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <h2>O que o seu imóvel tem de melhor?</h2>
                <FormElements
                  type="area"
                  name="positiveCharacteristics"
                  placeholder="Digite sua mensagem"
                  onChange={handleChange}
                  error={
                    touched.positiveCharacteristics &&
                    errors.positiveCharacteristics
                  }
                  value={values.positiveCharacteristics}
                  onBlur={handleBlur}
                />
              </FormGroup>

              <FormGroup>
                <h2>Há algum ponto problemático no imóvel?</h2>
                <FormElements
                  type="area"
                  name="negativeCharacteristics"
                  placeholder="Digite sua mensagem"
                  onChange={handleChange}
                  error={
                    touched.negativeCharacteristics &&
                    errors.negativeCharacteristics
                  }
                  value={values.negativeCharacteristics}
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
                  {/* Para agilizar o cadastro do seu imóvel, por favor, envie algumas
                  fotos */}
                </Description>

                <FormElements
                  type="file"
                  multiple
                  onChange={e => {
                    setFieldValue('images', [
                      ...values.images,
                      ...e.target.files
                    ]);
                  }}
                ></FormElements>
              </FormGroupPhotos>
              <GroupImages>
                {values.images.length > 0 &&
                  values.images.map((imgSrc, index) => {
                    return (
                      <GroupImage key={`groupimg-${index}`}>
                        <SVG
                          src={IClose}
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

              <InfoUser />

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

RegisterForm.getInitialProps = async ({ type, query }) => {
  const locals = await Api.Search.getLocals();
  const categories = await Api.Search.getCategories();
  const paises = await Api.Search.getFilters('?source=internacional');
  const itemBase = { label: 'Selecione', value: '' };

  const newPais = [ itemBase ];
  Object.keys(paises.locals).map(x => newPais.push({ label: x, value: x }));

  return {
    locals: locals,
    pais: newPais,
    categories,
    type: query.type
  };
};

export default RegisterForm;
