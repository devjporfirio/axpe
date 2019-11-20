import React from 'react';
import { BaseMask } from '../styles';

export default function CEP(props) {
  return (
    <BaseMask
      mask={[
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        '-',
        /[0-9]/,
        /[0-9]/,
        /[0-9]/
      ]}
      {...props}
    />
  );
}


89035-360