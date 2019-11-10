import React from 'react';
import { InputCheckbox } from './styles';

export default function Checkbox(props) {
  const { name, type, ...others } = props;
  return (
    <InputCheckbox
      name={name}
      type={type === 'radio' ? 'radio' : 'checkbox'}
      {...others}
    />
  );
}
