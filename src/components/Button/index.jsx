import React from 'react';
import Link from 'next/link';

// styles
import { ButtonContainer, ButtonLinkContainer } from './styles';

function Button(props) {
  const { as, className, children, color, href, target, type } = props;

  return type && (type === 'button' || type === 'submit') ? (
    <ButtonContainer {...props} color={color ? color : 'orange'}>
      {children}
    </ButtonContainer>
  ) : (target && target === 'blank') || href.search('http') === 0 ? (
    <ButtonLinkContainer href={href} className={className} color={color ? color : 'orange'} target={target}>
      {children}
    </ButtonLinkContainer>
  ) : (
    <Link href={href} as={as} passHref>
      <ButtonLinkContainer className={className} color={color ? color : 'orange'}>
        {children}
      </ButtonLinkContainer>
    </Link>
  );
}

export default Button;