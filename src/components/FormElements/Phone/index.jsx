import React from 'react';
import { BaseMask } from '../styles';

export default function Phone(props) {
  return (
    <BaseMask
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      {...props}
    />
  );
}
