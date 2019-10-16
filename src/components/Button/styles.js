import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.button`
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  width: 240px;
  height: 45px;
  border-radius: 4px;
  font: 15px 'RalewaySemiBold';
  line-height: 45px;
  display: block;
  text-align: center;

  ${props => !props.color && media.greaterThan('769px')` 
    width: 140px;
    height: 40px;
  `};

  ${props => !!props.color && ButtonIcon};
`;

const ButtonIcon = css`
  background-color: ${props => props.theme.colors[props.color]};
  color: ${({ theme }) => theme.colors.green};
  display: flex;
  align-items: center;
  width: 144px;
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  border-radius: 17.5px;

  img {
    width: 19px;
    margin-right: 10px;
  }
`;
