import React from 'react';
import PropTypes from 'prop-types';
import BuildingList from 'components/Building/List';

import { Buildings } from 'pages/Search/styles';
import { Module, TitleModule, TextModule, SlideSmall } from './styles';

function ModulePadrao({ comp, buildings }) {
  switch (comp.type) {
    case 'imoveis-vertical':
      return (
        <Module>
          <TitleModule>
            <strong>{comp.info.title}</strong> {comp.info.subtitle}
          </TitleModule>
          <TextModule>{comp.info.text}</TextModule>
          <Buildings>
            {buildings.map((building) =>
              building && building.status === 'active' ? (
                <BuildingList key={building.reference} item={building} layout="horizontal" />
              ) : null
            )}
          </Buildings>
        </Module>
      );
    case 'imoveis-horizontal':
      return (
        <Module>
          <TitleModule>
            <strong>{comp.info.title}</strong> {comp.info.subtitle}
          </TitleModule>
          <TextModule>{comp.info.text}</TextModule>
          <SlideSmall type="slickSmall" items={comp.buildings} />
        </Module>
      );
    default:
      return null;
  }
}

ModulePadrao.propTypes = {
  comp: PropTypes.shape({
    type: PropTypes.string,
    info: PropTypes.object,
    buildings: PropTypes.array,
  }).isRequired,
  buildings: PropTypes.array.isRequired,
};

export default ModulePadrao;
