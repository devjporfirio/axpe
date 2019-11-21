import React from 'react';
import Area from './Area';
import Checkbox from './Checkbox';
import Email from './Email';
import Phone from './Phone';
import Select from './Select';
import Text from './Text';
import CPF from './CPF';
import CEP from './CEP';
import File from './File';

import { Label, Span, Message } from './styles';

const TYPE_FIELD = {
  area: Area,
  checkbox: Checkbox,
  checkboxLink: Checkbox,
  radio: Checkbox,
  emailmask: Email,
  phone: Phone,
  select: Select,
  text: Text,
  cpf: CPF,
  cep: CEP,
  file: File
};

const Field = ({
  className,
  type,
  component: Component,
  label,
  message,
  ...props
}) => {
  if (type === 'file') return <Component type={type} {...props}></Component>;
  return (
    <>
      <Label className={className} type={type} htmlFor={props.name}>
        <Component type={type} {...props}></Component>
        {!!label && (
          <Span
            onClick={
              [ 'checkbox', 'checkboxLink', 'radio' ].includes(type)
                ? props.onChange
                : () => {
                    document.getElementsByName(props.name)[0].focus();
                  }
            }
          >
            {label}
          </Span>
        )}
      </Label>
      {!!message && <Message>{message}</Message>}
    </>
  );
};

export default function FormElements({ className, type = 'text', ...props }) {
  return (
    <Field
      className={className}
      component={TYPE_FIELD[type]}
      type={type}
      {...props}
    />
  );
}
