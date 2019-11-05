import React from 'react';
import Link from 'next/link';

// styles
import { ButtonContainer, ButtonLinkContainer } from './styles';

function Button(props) {
  const {
    as,
    className,
    children,
    color = 'orange',
    href,
    target,
    type,
    fullWidth = false
  } = props;

  return type && (type === 'button' || type === 'submit') ? (
    <ButtonContainer {...props} color={color} fullWidth={fullWidth}>
      {children}
    </ButtonContainer>
  ) : (target && target === 'blank') || (href && href.search('http')) === 0 ? (
    <ButtonLinkContainer
      href={href}
      className={className}
      color={color}
      fullWidth={fullWidth}
      target={target}
    >
      {children}
    </ButtonLinkContainer>
  ) : (
    <Link href={href} as={as} passHref>
      <ButtonLinkContainer
        className={className}
        color={color}
        fullWidth={fullWidth}
      >
        {children}
      </ButtonLinkContainer>
    </Link>
  );
}

export default Button;
