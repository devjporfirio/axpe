import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.white};

  h1 {
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.light};
  }

  ${media.greaterThan('768px')`
    width: 200px;
    height: 100%;
  `}
`;