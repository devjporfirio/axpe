import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BuildingList from 'components/Building/List';
import Button from 'components/Button';

import { Buildings } from 'pages/Search/styles';
import { Module, LoadMoreWrapper } from './styles';
import LandingFilterBar from './LandingFilterBar';

const PAGE_SIZE = 10;

function ModuleCustomizada({
  buildings,
  buildingPage,
  isOrderListActive,
  onToggleLayout,
  finality,
  onFinalityChange,
  localOptions,
  local,
  onLocalChange,
  orderBy,
  onOrderByChange,
}) {
  const [ visibleCount, setVisibleCount ] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [ finality, local, orderBy ]);

  const visibleBuildings = buildings.slice(0, visibleCount);
  const hasMore = visibleCount < buildings.length;

  return (
    <Module>
      <LandingFilterBar
        isOrderListActive={isOrderListActive}
        onToggleLayout={onToggleLayout}
        finality={finality}
        onFinalityChange={onFinalityChange}
        localOptions={localOptions}
        local={local}
        onLocalChange={onLocalChange}
        orderBy={orderBy}
        onOrderByChange={onOrderByChange}
      />
      <Buildings>
        {visibleBuildings.map((building) =>
          building && building.status === 'active' ? (
            <BuildingList key={building.reference} item={building} page={buildingPage} />
          ) : null
        )}
      </Buildings>
      {hasMore && (
        <LoadMoreWrapper>
          <Button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
            Ver mais
          </Button>
        </LoadMoreWrapper>
      )}
    </Module>
  );
}

ModuleCustomizada.propTypes = {
  buildings: PropTypes.array.isRequired,
  buildingPage: PropTypes.string,
  isOrderListActive: PropTypes.bool.isRequired,
  onToggleLayout: PropTypes.func.isRequired,
  finality: PropTypes.string.isRequired,
  onFinalityChange: PropTypes.func.isRequired,
  localOptions: PropTypes.array.isRequired,
  local: PropTypes.string.isRequired,
  onLocalChange: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  onOrderByChange: PropTypes.func.isRequired,
};

export default ModuleCustomizada;
