import React from 'react';

// components
import BuildingsPanel from 'components/BuildingsPanel';

// data
import DataJSON from './data';

// styles
import {
  Container
} from './styles';

function GuidelinesBuildings() {
  const data = {
    buildings: DataJSON
  };

  return (
    <Container>
      <BuildingsPanel
        title="Imóveis que você viu"
        buildingLayout="horizontal"
        data={data.buildings}
      />
      <BuildingsPanel
        title="Indicados para você"
        subtitle="Selecionamos alguns imóveis que acabaram de chegar"
        buildingLayout="vertical"
        data={data.buildings}
      />
    </Container>
  )
}

export default GuidelinesBuildings;
