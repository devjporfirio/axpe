import React from 'react';
import PropTypes from 'prop-types';
import OrderFilterDropdown from 'components/OrderFilterDropdown';

import { HeaderOrder, DisplayOrder } from 'pages/Search/styles';
import { FilterBar } from './styles';
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
  orderBy,
  onOrderByChange,
}) {
  return (
    <FilterBar>
      <HeaderOrder>
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
      </HeaderOrder>
    </FilterBar>
  );
}

LandingFilterBar.propTypes = {
  isOrderListActive: PropTypes.bool.isRequired,
  onToggleLayout: PropTypes.func.isRequired,
  finality: PropTypes.string.isRequired,
  onFinalityChange: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  onOrderByChange: PropTypes.func.isRequired,
};

export default LandingFilterBar;