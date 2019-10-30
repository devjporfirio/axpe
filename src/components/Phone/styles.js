import styled from 'styled-components';

export const Container = styled.a`
  color: ${({ theme }) => theme.colors.orange};
  font: 15px/18px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  display: flex;

  img {
    width: 20px;
    margin-right: 5px;
  }
`;
