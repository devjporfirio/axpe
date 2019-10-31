import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  background-color: ${props => props.theme.colors[props.color]};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  width: 240px;
  height: 45px;
  border-radius: 4px;
  font: 13px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  line-height: 45px;
  display: block;
  text-align: center;

  ${props =>
    !props.color &&
    media.greaterThan('medium')` 
    width: 140px;
  `};
`;
