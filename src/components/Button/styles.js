import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const ButtonStyle = css`
  display: inline-block;
  height: 45px;
  border-radius: 4px;
  font: 15px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  line-height: 45px;
  text-align: center;
  background-color: ${props => props.theme.colors[props.color]};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  padding: 0 25px;
  transition: all 300ms ease;

  &[disabled] {
    opacity: 0.2;
    cursor: default;
  }

  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  ${media.greaterThan('1024px')`
    ${props =>
      !props.color || (props.color === 'orange' && ButtonStyleDesktopOrange)}
  `}
`;

export const ButtonStyleDesktopOrange = css`
  &:hover {
    /* background-color: ${({ theme }) => theme.colors.orange}; */
    opacity: 0.7;
  }
`;

export const ButtonContainer = styled.button`
  ${ButtonStyle};
`;

export const ButtonLinkContainer = styled.a`
  ${ButtonStyle};
`;
