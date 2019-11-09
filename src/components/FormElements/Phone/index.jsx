import React from 'react';
import { PhoneMask } from '../styles';

export default function Phone(props) {
  return (
    <PhoneMask
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
