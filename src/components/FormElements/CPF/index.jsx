import React from 'react';
import { CPFMask } from '../styles';

export default function CPF(props) {
  return (
    <CPFMask
      mask={[
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        '.',
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        '.',
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        '-',
        /[0-9]/,
        /[0-9]/
      ]}
      {...props}
    />
  );
}
