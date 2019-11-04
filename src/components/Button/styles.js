import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const ButtonStyle = css`
  display: block;
  width: 240px;
  height: 45px;
  border-radius: 4px;
  font: 13px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  line-height: 45px;
  text-align: center;
  background-color: ${props => props.theme.colors[props.color]};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;

  &[disabled] {
    opacity: 0.2;
    cursor: default;
  }

  ${props =>
    !props.color &&
    media.greaterThan('medium')`
    width: 140px;
  `};
`;

export const ButtonContainer = styled.button`
  ${ButtonStyle};
`;

export const ButtonLinkContainer = styled.a`
  ${ButtonStyle};
`;
