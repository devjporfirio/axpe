import React from 'react';
import Area from './Area';
import Checkbox from './Checkbox';
import Email from './Email';
import Phone from './Phone';
import Select from './Select';
import Text from './Text';

const TYPE_FIELD = {
  area: Area,
  checkbox: Checkbox,
  email: Email,
  phone: Phone,
  select: Select,
  text: Text
};

const Field = ({ component: Component, label, ...props }) => {
  return (
    <label htmlFor={props.name}>
      {label && <span>{label}</span>}
      <Component label={label} {...props}></Component>
    </label>
  );
};

export default function FormElements({ type = 'text', ...props }) {
  return <Field component={TYPE_FIELD[type]} {...props} />;
}
