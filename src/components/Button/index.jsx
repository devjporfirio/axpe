import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import Link from 'components/Link';

export default function Button({
  className,
  color = 'orange',
  label,
  href = '',
  as = '',
  isExternal,
}) {
  return (
    <Link href={href} as={as} isExternal={isExternal}>
      <Container className={className} color={color}>
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
