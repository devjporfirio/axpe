import styled, { css } from 'styled-components';

export const Container = styled.div`
  background-color: ${props => props.theme.colors[props.color]};
  color: ${({ theme }) => theme.colors.green};
  display: flex;
  align-items: center;
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  border-radius: 17.5px;
  font: 14px/18px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  text-transform: uppercase;

  img {
    width: 19px;
    margin-right: 10px;
  }

  ${props => props.color && props.color == 'orange' && css`
    color: white;

    img {
      filter: invert(48%) sepia(90%) saturate(3049%) hue-rotate(4deg) brightness(75%) contrast(100%);
    }
  `}
`;
