import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useFormik } from 'formik';
import Api from 'services';
import * as Yup from 'yup';

// helpers
import SeoData from 'helpers/seo';

// components
import FormElements from 'components/FormElements';

// styles
import {
  Container,
  Wrapper,
  Breadcrumb,
  Header,
  Form,
  ButtonLocals,
  FormGroupi,
  FormList,
  FormListItem,
  FormCols,
  FormCol,
} from 'pages/DreamBuilding/Detail/styles';

const formSchema = Yup.object().shape({
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

function DreamBuildingSingle({ locals, categories, countries, type }) {
  const [ types, setTypes ] = useState([]);

  // const types = [
  //   { value: 'Residencial', label: 'Residencial em São Paulo' },
  //   { value: 'Comercial', label: 'Comercial em São Paulo' },
  //   { value: 'Praia', label: 'Praia' },
  //   { value: 'Campo', label: 'Campo' },
  //   { value: 'Internacional', label: 'Internacional' }
  // ];

  // console.log('locals', locals)
  // console.log('categories', categories)
  // console.log('countries', countries)

  useEffect(() => {
    const typesSelected = type.search('comerciais') >= 0 ? categories['COMERCIAL'] : categories['RESIDENCIAL'];
    setTypes(typesSelected.map(typeItem => ({ label: typeItem, value: typeItem })));
    // [
    //   { value: 'Apartamento', label: 'Apartamento' },
    //   { value: 'Cobertura', label: 'Cobertura' },
    //   { value: 'Casa em condomínio', label: 'Casa em condomínio' },
    //   { value: 'Terreno', label: 'Terreno' },
    // ];
  }, [])

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    // isSubmitting,
    // values,
    touched,
    errors,
    // setFieldValue
  } = useFormik({
    initialValues: {
      source: '',
      types: [],
      locals: [],
      investmentStart: '',
      investmentEnd: '',
      numberBedroom: '',
      areaStart: '',
      areaEnd: '',
      aboutRecreationArea: '',
      essentialBuilding: '',
      expendableBuilding: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // console.log(values);
      // const response = await Api.RegisterProperty.postProperty(
      //   user.access_token,
      //   values
      // );
      // setSubmitting(false);
      // if (response.status) {
      //   resetForm({});
      // }
    }
  });

  return (
    <>
      <Head>
        <title>{`Imóvel dos sonhos - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        <Wrapper>

          <Breadcrumb>
            <Link href="/imovel-dos-sonhos" passHref>
              <a href="/imovel-dos-sonhos">
                São Paulo
              </a>
            </Link>
            <span>/</span>
            <strong>Lançamento / Comprar</strong>
          </Breadcrumb>

          <Header>
            <h2>Conte com é o imóvel <strong>dos seus sonhos</strong></h2>
          </Header>

          <Form onSubmit={handleSubmit}>

            <FormGroupi>
              <h2>Qual o tipo do imóvel? <strong>Pode marcar quantas opções quiser, mas pelo menos uma é obrigatória.</strong></h2>
              <FormList>
                {types.map((type, typeIndex) => (
                  <FormListItem key={`formlistitem-type-${typeIndex}-${type.value}`}>
                    <FormElements
                      name="type"
                      type="checkbox"
                      label={type.label}
                      error={touched.type && errors.type}
                      value={type.value}
                      onBlur={handleBlur}
                    />
                  </FormListItem>
                ))}
              </FormList>
            </FormGroupi>

            <ButtonLocals type="button">Aonde você deseja? <strong>Selecione um ou mais bairros</strong></ButtonLocals>

            <FormGroupi mq="desktop">
              <h2>Aonde você deseja? <strong>Selecione um ou mais bairros</strong></h2>
              <FormList>
                {types.map((type, typeIndex) => (
                  <FormListItem key={`formlistitem-type-${typeIndex}-${type.value}`}>
                    <FormElements
                      name="type"
                      type="checkbox"
                      label={type.label}
                      error={touched.type && errors.type}
                      value={type.value}
                      onBlur={handleBlur}
                    />
                  </FormListItem>
                ))}
              </FormList>
            </FormGroupi>

            <FormGroupi>
              <h2>Conte pra gente sobre o imóvel que busca? <strong>Selecione apenas uma opção</strong></h2>
            </FormGroupi>

            <FormCols>
              <FormCol>
                <h3>Quanto você está planejando investir?</h3>
              </FormCol>
              <FormCol>
                <h3>Quantos quartos?</h3>
              </FormCol>
              <FormCol last={true}>
                <h3>Vagas de garagem?</h3>
              </FormCol>
            </FormCols>

            <FormCols>
              <FormCol>
                <h3>De quanto espaço você precisa?</h3>
              </FormCol>
              <FormCol last={true}>
                <h3>E sobre a área de lazer?</h3>
              </FormCol>
            </FormCols>

            <FormCols>
              <FormCol>
                <h3>Conte para gente o que não pode faltar no imóvel</h3>
              </FormCol>
              <FormCol last={true}>
                <h3>E o que você não gosta ou não quer em um imóvel?</h3>
                <FormElements
                  name="expendableBuilding"
                  type="area"
                  onChange={handleChange}
                  error={touched.expendableBuilding && errors.expendableBuilding}
                  onBlur={handleBlur}
                />
              </FormCol>
            </FormCols>

          </Form>

        </Wrapper>
      </Container>
    </>
  )
}

DreamBuildingSingle.getInitialProps = async ({ query }) => {
  const locals = await Api.Search.getLocals();
  const categories = await Api.Search.getCategories();
  const countries = await Api.Search.getFilters('?source=internacional');
  const itemBase = { label: 'Selecione', value: '' };

  const newContries = [ itemBase ];
  Object.keys(countries.locals).map(x => newContries.push({ label: x, value: x }));

  return {
    locals: locals,
    countries: newContries,
    categories,
    type: query.type
  };
};

export default DreamBuildingSingle;
