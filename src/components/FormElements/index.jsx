import React from 'react';
import Area from './Area';
import Checkbox from './Checkbox';
import Email from './Email';
import Phone from './Phone';
import Select from './Select';
import Text from './Text';
import CPF from './CPF';

import { Label, Span } from './styles';

const TYPE_FIELD = {
  area: Area,
  checkbox: Checkbox,
  checkboxLink: Checkbox,
  radio: Checkbox,
  emailmask: Email,
  phone: Phone,
  select: Select,
  text: Text,
  cpf: CPF
};

const Field = ({ type, component: Component, label, themeColor, error, ...props }) => {
  return (
    <Label type={type} htmlFor={props.name} themeColor={themeColor} error={error}>
      <Component type={type} {...props}></Component>
      {!!label && <Span>{label}</Span>}
    </Label>
  );
};

export default function FormElements({ type = 'text', ...props }) {
  return <Field component={TYPE_FIELD[type]} type={type} {...props} />;
}
