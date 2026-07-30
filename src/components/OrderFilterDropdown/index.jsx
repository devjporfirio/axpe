import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import CustomSelect from 'components/CustomSelect';

import {
  FilterGroup,
  HeaderOrderButton,
  HeaderOrderList,
  HeaderOrderListButton,
} from './styles';

function OrderFilterDropdown({ label, options, value, onChange }) {
  const [ comboActive, setComboActive ] = useState(false);
  const timing = useRef(false);

  const selected = options.find((item) => item.value === value);

  return (
    <>
      <CustomSelect
        options={options}
        value={value}
        searchFilter
        onChange={onChange}
      />

      <FilterGroup
        onMouseEnter={() => clearTimeout(timing.current)}
        onMouseLeave={() => {
          timing.current = setTimeout(() => setComboActive(false), 300);
        }}
      >
        <HeaderOrderButton
          type="button"
          active={comboActive}
          onClick={() => setComboActive(!comboActive)}
        >
          <strong>{label}:</strong>
          {selected && <span>{selected.label}</span>}
        </HeaderOrderButton>
        <HeaderOrderList active={comboActive}>
          {options.map((item) => (
            <HeaderOrderListButton
              type="button"
              key={`order-filter-${label}-${item.value}`}
              onClick={() => {
                onChange(item.value);
                setComboActive(false);
              }}
            >
              {item.label}
            </HeaderOrderListButton>
          ))}
        </HeaderOrderList>
      </FilterGroup>
    </>
  );
}

OrderFilterDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OrderFilterDropdown;
