import React, { useState, useEffect } from 'react';
import Breadcrumb from 'components/Breadcrumb';
import Gallery from 'components/Gallery';
import BlockHighlighted from 'components/BlockHighlighted';
import HowWeLove from './HowWeLove';
import Api from 'services';

import { Container, Alert } from './styles';

import DataSheet from './Datasheet';
import Planta from './Planta';

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

      <br />
      <Alert>
        Todas as informações aqui contidas, incluindo preço, metragem quadrada e
        valores são aproximadas e não garantidas, devendo ser confirmadas
        pessoalmente pelos interessados. No caso de imóveis em lançamento, as
        imagens são meramente ilustrativas e os valores estão sujeitos a
        alteração de tabela.
      </Alert>

      {property.components && property.components.length > 0 && (
        <HowWeLove
          reasons={property.components.find(
            x => x.module.slug === 'porque-adoramos'
          )}
        />
      )}
      <br />

      {property.components.find(x => x.module.slug === 'plantas') && (
        <Planta
          file={
            property.components.find(x => x.module.slug === 'plantas').data.file
          }
        />
      )}

      <BlockHighlighted
        texts={[
          {
            text: 'Não encontrou o ',
            color: 'white',
            fontFamily: 'BitterBold'
          },
          {
            text: 'imóvel ',
            color: 'greenLight',
            fontFamily: 'RalewayMedium'
          },
          {
            text: 'que busca?',
            color: 'orange',
            fontFamily: 'RalewayMedium'
          }
        ]}
        colorButton="orange"
        message="Que tal um imóvel na planta? Conheça nossas opções de imóveis em lançamento"
        labelButton="Entre em contato"
        onClickButton={() => {}}
      />
    </Container>
  );
}
