import React from 'react';
// import { useDispatch } from 'react-redux';
import GoogleMapReact from 'google-map-react';
// import Api from 'services';

// actions
// import { setMain } from 'store/modules/main/actions';

// components
import BlockHighlighted from 'components/BlockHighlighted';

// styles
import {
  Container,
  Header,
  Body,
  BlockForm,
  Numbers,
  PhoneNumber,
  Tel,
  Message,
  Whats,
  IframeContainer,
  Iframe,
  Mapa,
  Balloon,
  Pin,
  Circle,
  Rec
} from './styles';

function FormContact({ showHeader = true }) {
  // const dispatch = useDispatch();
  // onSubmit: async (values, { setSubmitting, resetForm }) => {
  //   const resp = await Api.Contact.postContact(values);
  //   setSubmitting(false);
  //   if (resp.status) {
  //     dispatch(
  //       setMain({
  //         modalContactSuccess: true
  //       })
  //     );
  //     resetForm({});
  //   }
  // }

  return (
    <>
      <Container>
        {showHeader && (
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
        )}
        <Body>
          <BlockForm showHeader={showHeader}>
            <Message showHeader={showHeader}>
              Esse é sua linha direta para falar com a gente sobre qualquer
              assunto. Pedir um imóvel bem específico, tirar dúvidas, pedir uma
              informação e também reclamar, dar sugestões, elogiar.
            </Message>
            <IframeContainer>
              <Iframe
                src="/forms/imovel/contato.html"
                border="none"
                frameBorder="0"
                title="Contato"
              ></Iframe>
            </IframeContainer>
            <BlockHighlighted type="contactWork" />
          </BlockForm>
          <Mapa>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyAn4jhPJpyJwgIYnYyr4Kaj1JSyg74Qoto'
              }}
              defaultCenter={{
                lat: -23.578524,
                lng: -46.67418
              }}
              defaultZoom={18}
            >
              <Pin lat={-23.577693} lng={-46.67388}>
                <Balloon>
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
      {/* <PrivacyPolicy
        onDemand={true}
        active={privacyPolicyActive}
        onClose={handlePrivacyPolicy}
      /> */}
    </>
  );
}

export default FormContact;