import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Phone({ phone = '11 3074-3600' }) {
  return (
    <Container href={`tel:+55${phone.replace(/\s/g, '').replace('-', '')}`}>
      {phone}
    </Container>
  );
}

Phone.propTypes = {
  phone: PropTypes.string
};
