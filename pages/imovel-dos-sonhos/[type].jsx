import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import { useFormik } from 'formik';
import Api from 'services';
import * as Yup from 'yup';

// helpers
import SeoData from 'helpers/seo';

// actions
import { setMain } from 'store/modules/main/actions';

// components
import Button from 'components/Button';
import FormElements from 'components/FormElements';

// styles
import {
  Container,
  Wrapper,
  Breadcrumb,
  Header,
  Form,
  ButtonLocals,
  FormGroupContainer,
  FormList,
  FormListItem,
  FormCols,
  FormCol,
  ButtonSubmitContainer
} from 'pages/DreamBuilding/Detail/styles';

import { FormGroup } from 'components/FormElements/styles';

const formSchema = Yup.object().shape({
  MultipleChoice1: Yup.array(),
  MultipleChoice: Yup.array(),
  Number: Yup.string().required(),
  Number1: Yup.string().required(),
  Number2: Yup.string().required(),
  Currency: Yup.string().required(),
  Currency_copy: Yup.string().required(),
  Dropdown4: Yup.string().required(),
  MultiLine1: Yup.string().required(),
  MultiLine2: Yup.string().required()
});

function DreamBuildingSingle({ type }) {
  const dispatch = useDispatch();
  const refForm = useRef(null);
  const user = useSelector(state => state.user);
  const getUrlFromType = useCallback(() => {
    switch(type) {
      case 'sao-paulo-comprar-residencial':
        return 'https://forms.zohopublic.com/axpeimoveis1/form/SITEVDRESRevendaSP/formperma/KNn-rBLBBrxdN7e3LS9gbDIJClRxjHZvIrN7IF0Nz6s/htmlRecords/submit';
      case 'sao-paulo-comprar-lancamentos':
        return 'https://forms.zohopublic.com/axpeimoveis1/form/SITEVDRESLancamentosSP1/formperma/D4L7hHASfRv_KCu3FlMwqXckNzHx7LkLGKktHLF48Uk/htmlRecords/submit';
      case 'sao-paulo-alugar-residencial':
        return 'https://forms.zohopublic.com/axpeimoveis1/form/SITELOCACAOSOPAULORESIDENCIAL/formperma/IlFKkt1LoSKeOYzNY1cfgoSiVLdCez3nuMFXIfyFtrY/htmlRecords/submit';
      case 'sao-paulo-comerciais':
        return 'https://forms.zohopublic.com/axpeimoveis1/form/SITELOCACAOSOPAULOCOMERCIAL/formperma/m9PkbVPJBwxV7g3YdnIQ_2j-45cg68aQAa76EGqsgm8/htmlRecords/submit';
      case 'praia-campo':
        return 'https://forms.zohopublic.com/axpeimoveis1/form/SITEVDRESRevendaLZ/formperma/9AXrHTXXrrDYcjS_uQJtjEUrvWl0T6spA8UnV7EfDUw/htmlRecords/submit';
      case 'internacional':
        return 'https://forms.zohopublic.com/axpeimoveis1/form/SITEVENDAINTERNACIONALPRONTOS/formperma/X3ojk7J71y7QdRK3lSWLBoDtLeIrb42xOHfcDOB3czE/htmlRecords/submit';
    }
  }, [ type ])

  const optionsDropdownNumbers = [ ...Array(11).keys() ].map(i => ({ label: i, value: i }));
  const optionsLeisure = [
    { label: 'De preferência, sem lazer', value: 'De preferência, sem lazer' },
    { label: 'O básico: piscina e academia', value: 'O básico: piscina e academia' },
    { label: 'Completo: tudo que podem me oferecer', value: 'Completo: tudo que podem me oferecer' }
  ];
  const optionsTypes = [
    { label: 'Apartamento', value: 'Apartamento' },
    { label: 'Casa', value: 'Casa' },
    { label: 'Casa de vila', value: 'Casa de vila' },
    { label: 'Casa em condomônio', value: 'Casa em condomônio' },
    { label: 'Cobertura', value: 'Cobertura' },
    { label: 'Conjunto', value: 'Conjunto' },
    { label: 'Galpão', value: 'Galpão' },
    { label: 'Laje', value: 'Laje' },
    { label: 'Loja', value: 'Loja' },
    { label: 'Prédio Monousuário', value: 'Prédio Monousuário' },
    { label: 'Terreno', value: 'Terreno' },
    { label: 'Vinhedo', value: 'Vinhedo' }
  ];
  const optionsLocals = [
    { label: 'Aclimação', value: 'Aclimação' },
    { label: 'Alto da Lapa', value: 'Alto da Lapa' },
    { label: 'Alto de Pinheiros', value: 'Alto de Pinheiros' },
    { label: 'Bela Vista', value: 'Bela Vista' },
    { label: 'Brooklin Novo', value: 'Brooklin Novo' },
    { label: 'Campo Belo', value: 'Campo Belo' },
    { label: 'Centro', value: 'Centro' },
    { label: 'Cidade Jardim', value: 'Cidade Jardim' },
    { label: 'Consolação', value: 'Consolação' },
    { label: 'Higienópolis', value: 'Higienópolis' },
    { label: 'Ibirapuera', value: 'Ibirapuera' },
    { label: 'Itaim Bibi', value: 'Itaim Bibi' },
    { label: 'Jardim América', value: 'Jardim América' },
    { label: 'Jardim Europa', value: 'Jardim Europa' },
    { label: 'Jardim Guedala', value: 'Jardim Guedala' },
    { label: 'Jardim Paulista', value: 'Jardim Paulista' },
    { label: 'Jardim Paulistano', value: 'Jardim Paulistano' },
    { label: 'Jardins / C. César', value: 'Jardins / C. César' },
    { label: 'Moema', value: 'Moema' },
    { label: 'Pacaembu', value: 'Pacaembu' },
    { label: 'Paraíso', value: 'Paraíso' },
    { label: 'Perdizes', value: 'Perdizes' },
    { label: 'Pinheiros', value: 'Pinheiros' },
    { label: 'Pompeia', value: 'Pompeia' },
    { label: 'Real Parque', value: 'Real Parque' },
    { label: 'Santa Cecília', value: 'Santa Cecília' },
    { label: 'Sumaré', value: 'Sumaré' },
    { label: 'Vila Beatriz', value: 'Vila Beatriz' },
    { label: 'Vila Madalena', value: 'Vila Madalena' },
    { label: 'Vila Mariana', value: 'Vila Mariana' },
    { label: 'Vila Nova Conceição', value: 'Vila Nova Conceição' },
    { label: 'Vila Olímpia', value: 'Vila Olímpia' }
  ];

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
      zf_redirect_url: `http://homolog.axpe.com.br/imovel-dos-sonhos/sucesso`,
      zc_gad: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      Name_First: user.me.name,
      Name_Last: user.me.lastName,
      PhoneNumber_countrycode: user.me.phone,
      Email: user.me.email,
      MultipleChoice1: [],
      MultipleChoice: [],
      locals: [],
      Number: '',
      Number1: '',
      Number2: '',
      Currency: '',
      Currency_copy: '',
      Dropdown4: '',
      MultiLine1: '',
      MultiLine2: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        refForm.current.submit();
      }, 1000);
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

          <Form ref={refForm} action={getUrlFromType()} method="POST" accept-charset="UTF-8" enctype="multipart/form-data" onSubmit={handleSubmit}>
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

            <FormGroupContainer>
              <h2>Qual o tipo do imóvel? <strong>Pode marcar quantas opções quiser, mas pelo menos uma é obrigatória.</strong></h2>
              <FormList>
                {optionsTypes.map((type, typeIndex) => (
                  <FormListItem key={`formlistitem-type-${typeIndex}-${type.value}`}>
                    <FormElements
                      name="MultipleChoice1"
                      type="checkbox"
                      label={type.label}
                      error={touched.MultipleChoice1 && errors.MultipleChoice1}
                      value={type.value}
                      onBlur={handleBlur}
                    />
                  </FormListItem>
                ))}
              </FormList>
            </FormGroupContainer>

            <ButtonLocals type="button">Aonde você deseja? <strong>Selecione um ou mais bairros</strong></ButtonLocals>

            <FormGroupContainer mq="desktop">
              <h2>Aonde você deseja? <strong>Selecione um ou mais bairros</strong></h2>
              <FormList>
                {optionsLocals.map((local, localIndex) => (
                  <FormListItem key={`formlistitem-type-${localIndex}-${local.value}`}>
                    <FormElements
                      name="MultipleChoice"
                      type="checkbox"
                      label={local.label}
                      error={touched.MultipleChoice && errors.MultipleChoice}
                      value={local.value}
                      onBlur={handleBlur}
                    />
                  </FormListItem>
                ))}
              </FormList>
            </FormGroupContainer>

            <FormGroupContainer>
              <h2>Conte pra gente sobre o imóvel que busca? <strong>Selecione apenas uma opção</strong></h2>
            </FormGroupContainer>

            <FormCols>
              <FormCol layout="half">
                <h3>Quanto você está planejando investir?</h3>
                <FormGroup>
                  <FormElements
                    name="Currency_copy"
                    label="Valor em R$"
                    placeholder="Valor em R$"
                    onChange={event => {
                      const currency = event.target.value;
                      setFieldValue('Currency_copy', currency)
                      setFieldValue('Currency', currency.replace('R$', '').replace(/[.]/g, ''))
                    }}
                    error={touched.Currency_copy && errors.Currency_copy}
                    value={values.Currency_copy}
                    onBlur={handleBlur}
                  />
                </FormGroup>
              </FormCol>
              <FormCol layout="bedrooms">
                <h3>Quantos quartos?</h3>
                <FormGroup>
                  <FormElements
                    name="Number"
                    type="select"
                    items={optionsDropdownNumbers}
                    onChange={handleChange}
                    error={touched.Number && errors.Number}
                    onBlur={handleBlur}
                  />
                </FormGroup>
              </FormCol>
              <FormCol layout="parking" last={true}>
                <h3>Vagas de garagem?</h3>
                <FormGroup>
                  <FormElements
                    name="Number1"
                    type="select"
                    items={optionsDropdownNumbers}
                    onChange={handleChange}
                    error={touched.Number1 && errors.Number1}
                    onBlur={handleBlur}
                  />
                </FormGroup>
              </FormCol>
            </FormCols>

            <FormCols>
              <FormCol layout="half">
                <h3>De quanto espaço você precisa?</h3>
                <FormGroup>
                  <FormElements
                    name="Number2"
                    label="Área útil (m²)"
                    placeholder="Área útil (m²)"
                    onChange={handleChange}
                    error={touched.Number2 && errors.Number2}
                    value={values.Number2}
                    onBlur={handleBlur}
                  />
                </FormGroup>
              </FormCol>
              <FormCol layout="half" last={true}>
                <h3>E sobre a área de lazer?</h3>
                <FormGroup>
                  <FormElements
                    name="Dropdown4"
                    type="select"
                    items={optionsLeisure}
                    onChange={handleChange}
                    error={touched.Dropdown4 && errors.Dropdown4}
                    onBlur={handleBlur}
                  />
                </FormGroup>
              </FormCol>
            </FormCols>

            <FormCols>
              <FormCol layout="half">
                <h3>Conte para gente o que não pode faltar no imóvel</h3>
                <FormGroup>
                  <FormElements
                    name="MultiLine2"
                    type="area"
                    onChange={handleChange}
                    error={touched.MultiLine2 && errors.MultiLine2}
                    onBlur={handleBlur}
                  />
                </FormGroup>
              </FormCol>
              <FormCol layout="half" last={true}>
                <h3>E o que você não gosta ou não quer em um imóvel?</h3>
                <FormGroup>
                  <FormElements
                    name="MultiLine1"
                    type="area"
                    onChange={handleChange}
                    error={touched.MultiLine1 && errors.MultiLine1}
                    onBlur={handleBlur}
                  />
                </FormGroup>
              </FormCol>
            </FormCols>

            <ButtonSubmitContainer>
              <Button disabled={isSubmitting} type="submit">
                Enviar
              </Button>
            </ButtonSubmitContainer>

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
