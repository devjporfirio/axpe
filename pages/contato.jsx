import React from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { useFormik } from 'formik';
import Api from 'services';
import * as Yup from 'yup';

// components
import BlockHighlighted from 'components/BlockHighlighted';
import FormElements from 'components/FormElements';
import { FormGroup } from 'components/FormElements/styles';

// helpers
import SeoData from 'helpers/seo';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import {
  ButtonContainer,
  Container,
  Header,
  Body,
  BlockForm,
  Numbers,
  PhoneNumber,
  Tel,
  Message,
  Whats,
  Form,
  FormGroupButton,
  Mapa,
  Balloon,
  Pin,
  Circle,
  Rec
} from 'pages/Contact/styles';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2)
    .required(),
  lastName: Yup.string()
    .min(2)
    .required(),
  email: Yup.string()
    .email()
    .required(),
  phone: Yup.string().required(),
  mobile: Yup.string().required(),
  subject: Yup.string().required(),
  message: Yup.string()
    .min(2)
    .required(),
  terms: Yup.boolean()
    .oneOf([ true ])
    .required()
});

function Contact() {
  const dispatch = useDispatch();
  const linkPolitics = <a href="/politica">política de privacidade</a>;

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    touched,
    errors
  } = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      mobile: '',
      subject: '',
      message: '',
      terms: false
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const resp = await Api.Contact.postContact(values);

      setSubmitting(false);

      if (resp.status) {
        dispatch(
          setMain({
            modalNewsletterSuccess: true
          })
        );
        resetForm({});
      }
    }
  });

  return (
    <>
      <Head>
        <title>{`Fale com a gente - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        <Header>
          <BlockHighlighted type="contact" />
          <Numbers>
            <PhoneNumber>
              <p>Se preferir ligue:</p>
              <Tel flag="tel" />
            </PhoneNumber>
            <PhoneNumber>
              <p>Whatsapp:</p>
              <Whats flag="whats" showIcon />
            </PhoneNumber>
          </Numbers>
        </Header>
        <Body>
          <BlockForm>
            <Message>
              Esse é sua linha direta para falar com a gente sobre qualquer
              assunto. Pedir um imóvel bem específico, tirar dúvidas, pedir uma
              informação e também reclamar, dar sugestões, elogiar.
            </Message>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <h2>Seus dados de contato</h2>
                <FormElements
                  name="name"
                  label="Nome"
                  placeholder="Nome"
                  onChange={handleChange}
                  error={touched.name && errors.name}
                  value={values.name}
                  onBlur={handleBlur}
                />
                <FormElements
                  name="lastName"
                  label="Sobrenome"
                  placeholder="Sobrenome"
                  onChange={handleChange}
                  error={touched.lastName && errors.lastName}
                  value={values.lastName}
                  onBlur={handleBlur}
                />
                <FormElements
                  type="emailmask"
                  name="email"
                  label="E-mail"
                  placeholder="E-mail"
                  onChange={handleChange}
                  error={touched.email && errors.email}
                  value={values.email}
                  onBlur={handleBlur}
                />
                <FormElements
                  type="phone"
                  name="phone"
                  label="Telefone"
                  placeholder="Telefone"
                  onChange={handleChange}
                  error={touched.phone && errors.phone}
                  value={values.phone}
                  onBlur={handleBlur}
                />
                <FormElements
                  type="phone"
                  name="mobile"
                  label="Celular"
                  placeholder="Celular"
                  onChange={handleChange}
                  error={touched.mobile && errors.mobile}
                  value={values.mobile}
                  onBlur={handleBlur}
                />
              </FormGroup>

              <FormGroup>
                <h2>Assunto:</h2>
                <FormElements
                  name="subject"
                  type="select"
                  items={[
                    { label: 'Selecione o assunto', value: '' },
                    { label: 'Compra', value: 'compra' },
                    { label: 'Venda', value: 'venda' }
                  ]}
                  onChange={handleChange}
                  error={touched.subject && errors.subject}
                  value={values.subject}
                  onBlur={handleBlur}
                />
              </FormGroup>

              <FormGroup>
                <h2>Sua Mensagem</h2>
                <FormElements
                  type="area"
                  name="message"
                  placeholder="Digite sua mensagem"
                  onChange={handleChange}
                  error={touched.message && errors.message}
                  value={values.message}
                  onBlur={handleBlur}
                />
              </FormGroup>

              <FormGroupButton>
                <FormElements
                  type="checkboxLink"
                  name="terms"
                  label={
                    <>Declaro que li e concordo com a {linkPolitics} da Axpe.</>
                  }
                  onChange={handleChange}
                  error={touched.terms && errors.terms}
                  value={values.terms}
                  checked={values.terms}
                  onBlur={handleBlur}
                />
                <ButtonContainer disabled={isSubmitting} type="submit">
                  Enviar
                </ButtonContainer>
              </FormGroupButton>
            </Form>
            <BlockHighlighted type="contactWork" />
          </BlockForm>
          <Mapa>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyAn4jhPJpyJwgIYnYyr4Kaj1JSyg74Qoto'
              }}
              defaultCenter={{
                lat: -23.578524,
                lng: -46.674180
              }}
              defaultZoom={18}
            >
              <Pin lat={-23.577693} lng={-46.673880}>
                <Balloon>
                  <div></div>
                  <h4>Nosso escritório</h4>
                  <p>
                    Avenida Nove de Julho, 5017, 10° Andar. Jardim Paulista - São
                    Paulo, SP
                  </p>
                  <a href="https://g.page/axpe_imoveis?share">Como chegar?</a>
                </Balloon>
                <Rec></Rec>
                <Circle></Circle>
              </Pin>
            </GoogleMapReact>
          </Mapa>
        </Body>
      </Container>
    </>
  );
}

export default Contact;
