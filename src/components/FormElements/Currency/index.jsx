import React from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { BaseMask } from '../styles';

const numberMask = createNumberMask({
  prefix: 'R$',
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2
});

export default function Currency(props) {
  return <BaseMask mask={numberMask} {...props} />;
}
