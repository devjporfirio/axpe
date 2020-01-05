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
    disabled,
    href = '',
    size = 'normal',
    target,
    type,
    fullWidth = false
  } = props;

  return type && (type === 'button' || type === 'submit') ? (
    <ButtonContainer disabled={disabled} {...props} color={color}>
      {children}
    </ButtonContainer>
  ) : (target && target === 'blank') || (href && href.search('http')) === 0 ? (
    <ButtonLinkContainer
      className={className}
      color={color}
      href={href}
      target={target}
      size={size}
      fullWidth={fullWidth}
    >
      {children}
    </ButtonLinkContainer>
  ) : (
    <Link href={href} as={as} passHref>
      <ButtonLinkContainer
        className={className}
        color={color}
        size={size}
        fullWidth={fullWidth}
      >
        {children}
      </ButtonLinkContainer>
    </Link>
  );
}

export default Button;
