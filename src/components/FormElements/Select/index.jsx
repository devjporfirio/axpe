import React from 'react';
import { InputSelect } from '../styles';

export default function Select(props) {
  const { items } = props;
  return (
    <InputSelect>
      {items &&
        items.length > 0 &&
        items.map(i => (
          <option key={i.value} value={i.value}>
            {i.label}
          </option>
        ))}
    </InputSelect>
  );
}
