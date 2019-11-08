import React from 'react';
import Area from './Area';
import Checkbox from './Checkbox';
import Email from './Email';
import Phone from './Phone';
import Select from './Select';
import Text from './Text';

import { Label, Span } from './styles';

const TYPE_FIELD = {
  area: Area,
  checkbox: Checkbox,
  email: Email,
  phone: Phone,
  select: Select,
  text: Text
};

const Field = ({ type, component: Component, label, ...props }) => {
  return (
    <Label type={type} htmlFor={props.name}>
      <Component {...props}></Component>
      {label && <Span>{label}</Span>}
    </Label>
  );
};

export default function FormElements({ type = 'text', ...props }) {
  return <Field component={TYPE_FIELD[type]} type={type} {...props} />;
}
