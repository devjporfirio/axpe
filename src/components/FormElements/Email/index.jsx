import React from 'react';
import emailMask from 'text-mask-addons/dist/emailMask';

import { BaseMask } from '../styles';

export default function Email(props) {
  return <BaseMask mask={emailMask} {...props} />;
}
