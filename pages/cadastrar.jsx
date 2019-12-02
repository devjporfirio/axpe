import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import SVG from 'react-inlinesvg';
import Api from 'services';
import * as Yup from 'yup';

// components
import BlockHighlighted from 'components/BlockHighlighted';
import FormElements from 'components/FormElements';
import Contact from 'components/Contact';

// actions
import { setMain } from 'store/modules/main/actions';

// images
import IUser from 'assets/icons/user';
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
  InfoLogin,
  Info,
  GroupImages,
  GroupImage,
  Image,
  FormGroupFooter,
  CheckLinkTerms,
  ButtonSubmit
} from 'pages/RegisterProperty/styles';

function RegisterProperty({ locals, categories, pais }) {
  const dispatch = useDispatch();
  const registrySchema = Yup.object().shape({
    type: Yup.string()
      .oneOf([ 'Residencial', 'Comercial', 'Praia', 'Campo', 'Internacional' ])
      .required(),
    finality: Yup.string()
      .oneOf([ 'Vender', 'Aluguel' ])
      .required(),
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
    valueRequested: Yup.number().required(),
    valueTax: Yup.number().required(),
    valueCondo: Yup.number().required(),
    positiveCharacteristics: Yup.string().required(),
    negativeCharacteristics: Yup.string().required(),
    images: Yup.array(),
    terms: Yup.boolean()
      .oneOf([ true ])
      .required()
  });

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
      type: '',
      finality: '',
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
      valueRequested: '',
      valueTax: '',
      valueCondo: '',
      positiveCharacteristics: '',
      negativeCharacteristics: '',
      images: [],
      terms: false
    },
    validationSchema: registrySchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const resp = await Api.RegisterProperty.postProperty(values);
      setSubmitting(false);
      if (resp.status === 'success') {
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

  return (
    <Container>
      <BlockHighlighted type="registerProperty" />
      <Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <h2>Qual o perfil do imóvel que deseja cadastrar?</h2>
            <FormGroupFlex>
              <FormElements
                name="type"
                type="checkbox"
                label="Residencial"
                size="big"
                checked={values.type === 'Residencial'}
                onChange={() => setFieldValue('type', 'Residencial')}
                error={touched.type && errors.type}
              />
              <FormElements
                name="type"
                type="checkbox"
                label="Comercial"
                size="big"
                checked={values.type === 'Comercial'}
                onChange={() => setFieldValue('type', 'Comercial')}
                error={touched.type && errors.type}
              />
              <FormElements
                name="type"
                type="checkbox"
                label="Praia"
                size="big"
                checked={values.type === 'Praia'}
                onChange={() => setFieldValue('type', 'Praia')}
                error={touched.type && errors.type}
              />
              <FormElements
                name="type"
                type="checkbox"
                label="Campo"
                size="big"
                checked={values.type === 'Campo'}
                onChange={() => setFieldValue('type', 'Campo')}
                error={touched.type && errors.type}
              />
              <FormElements
                name="type"
                type="checkbox"
                label="Internacional"
                size="big"
                checked={values.type === 'Internacional'}
                onChange={() => setFieldValue('type', 'Internacional')}
                error={touched.type && errors.type}
              />
            </FormGroupFlex>
          </FormGroup>

          <FormRow>
            <FormGroup>
              <h2>O que você deseja?</h2>
              <FormGroupTwo>
                <FormElements
                  name="finality"
                  type="checkbox"
                  label="Vender"
                  checked={values.finality === 'Vender'}
                  onChange={() => setFieldValue('finality', 'Vender')}
                  error={touched.finality && errors.finality}
                />
                <FormElements
                  name="finality"
                  type="checkbox"
                  label="Alugar"
                  checked={values.finality === 'Aluguel'}
                  onChange={() => setFieldValue('finality', 'Aluguel')}
                  error={touched.finality && errors.finality}
                />
              </FormGroupTwo>
            </FormGroup>

            <FormGroupRow>
              <FormGroup>
                <h2>Qual o tipo do imóvel?</h2>
                <FormElements
                  name="category"
                  type="select"
                  items={categories}
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
                    onChange={handleChange}
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
                items={locals}
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
              <FormElements
                name="valueRequested"
                label="Qual o valor de venda que gostaria?"
                placeholder="R$"
                onChange={handleChange}
                message="(Incluindo 6% de comissão)"
                error={touched.valueRequested && errors.valueRequested}
                value={values.valueRequested}
                onBlur={handleBlur}
              />

              {values.type !== 'Internacional' && (
                <>
                  <FormElements
                    name="valueRequested"
                    label="Qual o valor de aluguel que gostaria?"
                    placeholder="R$"
                    message={
                      values.type !== 'Residencial'
                        ? 'Incluindo comissão (primeiro aluguel)'
                        : ''
                    }
                    onChange={handleChange}
                    error={touched.valueRequested && errors.valueRequested}
                    value={values.valueRequested}
                    onBlur={handleBlur}
                  />
                  <FormElements
                    name="valueTax"
                    label="Valor mensal de IPTU"
                    placeholder="R$"
                    onChange={handleChange}
                    error={touched.valueTax && errors.valueTax}
                    value={values.valueTax}
                    onBlur={handleBlur}
                  />
                  <FormElements
                    name="valueCondo"
                    label="Qual o valor do condomínio"
                    placeholder="R$"
                    onChange={handleChange}
                    error={touched.valueCondo && errors.valueCondo}
                    value={values.valueCondo}
                    onBlur={handleBlur}
                  />
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
                    <GroupImage key={index}>
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
              onChange={handleChange}
              error={touched.terms && errors.terms}
              value={values.terms}
              checked={values.terms}
              onBlur={handleBlur}
            />

            <InfoLogin>
              <SVG src={IUser} uniquifyIDs={true} />
              <Info>
                <p>
                  Você está logado como
                  <strong> Rodrigo Alarcon</strong>
                </p>
                <p>Tel.: (11) 3082 5693</p>
                <p>E-mail: ralarcon@futuebrand.com</p>
                <p>
                  Se não for você <a href="/">clique aqui</a>
                </p>
              </Info>
            </InfoLogin>

            <ButtonSubmit disabled={isSubmitting} type="submit">
              Enviar
            </ButtonSubmit>
          </FormGroupFooter>
        </Form>
      </Body>
      <Contact />
    </Container>
  );
}

RegisterProperty.getInitialProps = async () => {
  const locals = await Api.Search.getLocals();
  const categories = await Api.Search.getCategories();
  const paises = await Api.Search.getFilters(
    '?source=internacional&finality=venda'
  );
  const itemBase = { label: 'Selecione', value: '' };

  const newLocals = [ itemBase ];
  const newCategories = [ itemBase ];
  const newPais = [ itemBase ];

  Object.keys(locals).map(x =>
    locals[x].map(y => newLocals.push({ label: y, value: y }))
  );
  Object.keys(categories).map(x =>
    categories[x].map(y => newCategories.push({ label: y, value: y }))
  );

  Object.keys(paises.locals).map(x =>
    newPais.push({ label: x, value: x })
  );

  return {
    locals: newLocals,
    categories: newCategories,
    pais: newPais
  };
};

export default RegisterProperty;
