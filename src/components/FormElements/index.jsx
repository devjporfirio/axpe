import React from 'react';

import { Input, InputCheckbox, InputSelect, InputTextArea } from './styles';

export const Text = props => {
  return <Input {...props} />;
};

export const Email = props => {
  return <Input {...props} />;
};

export const Phone = props => {
  return <Input {...props} />;
};

export const Select = props => {
  const { items } = props;
  return (
    <InputSelect>
      {items &&
        items.length > 0 &&
        items.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
    </InputSelect>
  );
};

export const Area = props => {
  return <InputTextArea {...props}></InputTextArea>;
};

export const Checkbox = props => {
  const { label, name } = props;
  return (
    <div>
      <InputCheckbox name={name} {...props} type="checkbox" />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
