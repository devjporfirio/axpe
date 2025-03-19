import styled, { css } from 'styled-components';

export const Container = styled.div`
  background-color: ${props => props.theme.colors[props.color]};
  color: ${({ theme }) => theme.colors.green};
  display: flex;
  align-items: center;
  height: 35px;
  line-height: 35px;
  padding: 0 8px;
  border-radius: 4px;
  font: 12px/16px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  text-transform: uppercase;

  img {
    width: 14px;
    margin-right: 10px;
  }

  ${props => props.color && (props.color == 'orange' || props.color == 'greenLight') && css`
    color: white;
  `}
`;
