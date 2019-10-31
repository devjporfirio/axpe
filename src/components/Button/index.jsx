import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

import Link from 'next/link';

export default function Button({
  type = 'button',
  label,
  href = '',
  as = '',
  ...props
}) {
  return (
    <Link href={href} as={as}>
      <Container {...props}>
        {label}
      </Container>
    </Link>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOf([ 'star', 'check', 'sofa' ])
};
