import React from 'react';
import { InputCheckbox } from './styles';

export default function Checkbox(props) {
  return <InputCheckbox name={props.name} type="checkbox" {...props} />;
}
