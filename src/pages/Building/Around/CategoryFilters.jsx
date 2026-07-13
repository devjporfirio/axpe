import React from 'react';

import ISchool from 'assets/icons/poi/poi-school.svg';
import IMarket from 'assets/icons/poi/poi-market.svg';
import IFood from 'assets/icons/poi/poi-food.svg';
import IPark from 'assets/icons/poi/poi-park.svg';
import ITourism from 'assets/icons/poi/poi-tourism.svg';
import IHealth from 'assets/icons/poi/poi-health.svg';
import ITransit from 'assets/icons/poi/poi-transit.svg';

import { Chips, Chip } from './styles';

const CATEGORIES = [
  { key: 'school', label: 'Escolas', icon: ISchool },
  { key: 'market', label: 'Mercados', icon: IMarket },
  { key: 'food', label: 'Restaurantes', icon: IFood },
  { key: 'park', label: 'Parques', icon: IPark },
  { key: 'tourism', label: 'Turismo', icon: ITourism },
  { key: 'health', label: 'Saúde', icon: IHealth },
  { key: 'transit', label: 'Transporte', icon: ITransit },
];

function CategoryFilters({ active, onToggle }) {
  return (
    <Chips>
      {CATEGORIES.map(({ key, label, icon }) => (
        <Chip key={key} type="button" isActive={active.includes(key)} onClick={() => onToggle(key)}>
          <img src={icon} alt="" />
          {label}
        </Chip>
      ))}
    </Chips>
  );
}

export default CategoryFilters;
