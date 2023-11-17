import React from 'react';
import PropTypes from 'prop-types';

import WhatsappIconSVG from 'assets/icons/whats-white';

import { Container } from './styles';

const LINKS = {
  tel: 'tel:+5511974478093',
  whats: 'https://wa.me/5511974478093'
};

const NUMBERS = {
  tel: '(11) 97447-8093',
  whats: '(11) 97447-8093'
};

const ICONS = {
  tel: '',
  whats: WhatsappIconSVG
};

function Phone({ flag = 'tel', className, showIcon, ...props }) {
  return (
    <Container
      className={className}
      href={LINKS[flag]}
      {...props}
    >
      {showIcon && <img src={ICONS[flag]} alt={flag} />}
      {NUMBERS[flag]}
    </Container>
  );
}

Phone.propTypes = {
  phone: PropTypes.string
};

export default Phone;