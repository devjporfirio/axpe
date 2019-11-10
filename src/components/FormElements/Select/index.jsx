import React from 'react';
import { InputSelect } from '../styles';

export default function Select(props) {
  return (
    <InputSelect {...props}>
      {props.items &&
        props.items.length > 0 &&
        props.items.map(i => (
          <option key={i.value} value={i.value}>
            {i.label}
          </option>
        ))}
    </InputSelect>
  );
}
