import React, { useState, useEffect } from 'react';
import Breadcrumb from 'components/Breadcrumb';
import Gallery from 'components/Gallery';
import Api from 'services';

import { Container, Alert, Delivery, HowWeLove } from './styles';

import DataSheet from './Datasheet';

export default function Intern({ match }) {
  const { reference } = match.params;
  const [ property, setProperty ] = useState({});

  useEffect(() => {
    async function loadIntern() {
      const property = await Api.intern.loadIntern(reference);
      setProperty(property.building);
    }
    loadIntern();
  }, []);

  if (!property || !Object.keys(property).length > 0) {
    return <h1>Loading..</h1>;
  }

  return (
    <Container>
      <Breadcrumb
        category={property.category}
        local={property.address.local}
        source={property.source}
        reference={property.reference}
      />

      <br />
      {property.gallery && (
        <Gallery items={property.gallery} tour360={property.tour360} />
      )}
      <br />

      <DataSheet property={property} />

      {property.type !== 'pronto' && (
        <Delivery>
          <p>
            Previsão de entrega em <span>{property.infos.releaseDelivery}</span>
          </p>
        </Delivery>
      )}
      <Alert>
        Todas as informações aqui contidas, incluindo preço, metragem quadrada e
        valores são aproximadas e não garantidas, devendo ser confirmadas
        pessoalmente pelos interessados. No caso de imóveis em lançamento, as
        imagens são meramente ilustrativas e os valores estão sujeitos a
        alteração de tabela.
      </Alert>
      <HowWeLove>
        <p>Porque adoramos esse imovel</p>
      </HowWeLove>
      <br/>
    </Container>
  );
}
