import React from 'react';
import { ButtonContainer, ButtonLinkContainer } from './styles';
import Link from 'components/Link';

function Button(props) {
  const { as, className, children, color, href, type } = props;

  return type && (type === 'button' || type === 'submit') ? (
    <ButtonContainer {...props}>
      {children}
    </ButtonContainer>
  ) : (
    <Link href={href} as={as} passHref>
      <ButtonLinkContainer className={className} color={color}>
        {children}
      </ButtonLinkContainer>
    </Link>
  );
}

export default Button;