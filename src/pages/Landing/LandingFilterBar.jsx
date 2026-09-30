import React from 'react';
import PropTypes from 'prop-types';
import OrderFilterDropdown from 'components/OrderFilterDropdown';

import { DisplayOrder } from 'pages/Search/styles';
import { FilterBar, FilterOrder, LocalFilter } from './styles';
import {
  orderOptions,
  finalityOptions
} from './helpers';

// assets
import IOrderBlockOn from 'assets/icons/order-block-active.svg';
import IOrderRowOn from 'assets/icons/order-row-active.svg';
import IOrderBlockOff from 'assets/icons/order-block-off.svg';
import IOrderRowOff from 'assets/icons/order-row-off.svg';

function LandingFilterBar({
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
  return (
    <FilterBar>
      <FilterOrder>
        <DisplayOrder>
          <button type="button" onClick={onToggleLayout}>
            <img
              src={isOrderListActive ? IOrderBlockOff : IOrderBlockOn}
              alt="Botão de ordenar bloco"
              loading="lazy"
            />
          </button>

          <button type="button" onClick={onToggleLayout}>
            <img
              src={isOrderListActive ? IOrderRowOn : IOrderRowOff}
              alt="Botão de ordenar lista"
              loading="lazy"
            />
          </button>
        </DisplayOrder>

        <LocalFilter>
          <OrderFilterDropdown
            label="Bairro"
            options={localOptions}
            value={local}
            onChange={onLocalChange}
          />
        </LocalFilter>

        <OrderFilterDropdown
          label="Filtrar por"
          options={finalityOptions}
          value={finality}
          onChange={onFinalityChange}
        />

        <OrderFilterDropdown
          label="Ordenar por"
          options={orderOptions}
          value={orderBy}
          onChange={onOrderByChange}
        />
      </FilterOrder>
    </FilterBar>
  );
}

LandingFilterBar.propTypes = {
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

export default LandingFilterBar;