import React from 'react';
import emailMask from 'text-mask-addons/dist/emailMask';

import { EmailMask } from '../styles';

export default function Email(props) {
  return <EmailMask mask={emailMask} {...props} />;
}
