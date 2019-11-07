import React from 'react';
import { InputCheckbox } from '../styles';

export default function Checkbox(props) {
  const { label, name } = props;
  return (
    <InputCheckbox htmlFor={name}>
      <input name={name} type="checkbox" />
      <span>{label}</span>
    </InputCheckbox>
  );
}
