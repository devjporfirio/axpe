import React, { useState, useEffect } from 'react';
import Breadcrumb from 'components/Breadcrumb';
import Gallery from 'components/Gallery';
import BlockHighlighted from 'components/BlockHighlighted';
import Contact from 'components/Contact';
import PanelBuildings from 'components/PanelBuildings';
import SimilarBuilding from 'components/SimilarBuilding';
import Api from 'services';

import { Container, Alert } from './styles';

import DataSheet from './Datasheet';
import Modules from './Modules';

export default function Intern({ match }) {
  const { reference } = match.params;
  const [ property, setProperty ] = useState({});
  const [ similarBuildings, setSimilarBuildings ] = useState([]);

  useEffect(() => {
    async function loadInit() {
      const property = await Api.intern.loadIntern(reference);
      setProperty(property.building);

      const similar = await Api.building.getBuildingsSimilar(
        property.building,
        3
      );
      const buildings = similar.buildings.filter(x => x.reference !== property.building.reference);
      setSimilarBuildings(buildings);
    }
    loadInit();
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
      <br />

      {Object.keys(property.components).length > 0 && (
        <Modules modules={property.components} />
      )}

      <PanelBuildings title="Pessoas que viram este imóvel também viram:">
        {property.type === 'lancamento' &&
          similarBuildings &&
          similarBuildings.length > 0 &&
          similarBuildings.map(building => (
            <SimilarBuilding item={building} key={building.reference} />
          ))}
      </PanelBuildings>

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
      <Contact />
    </Container>
  );
}
