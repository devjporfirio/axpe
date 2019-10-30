import React from 'react';
import PropTypes from 'prop-types';

import IWhats from 'assets/icons/whats-white';

import { Container } from './styles';

const FLAGS = {
  tel: 'tel:+55',
  whats: 'whatsapp://send&phone='
};

const NUMBERS = {
  tel: '(11) 3074-3600',
  whats: '(11) 99037-3600'
};

const ICONS = {
  tel: '',
  whats: IWhats
};

export default function Phone({ flag = 'tel', className, showIcon }) {
  return (
    <Container
      className={className}
      href={`${FLAGS[flag]}${FLAGS[flag].replace(/\s/g, '').replace('-', '')}`}
    >
      {showIcon && <img src={ICONS[flag]} alt={flag} />}
      {NUMBERS[flag]}
    </Container>
  );
}

Phone.propTypes = {
  phone: PropTypes.string
};
