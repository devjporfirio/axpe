import styled from 'styled-components';
import media from 'styled-media-query';

// components
import Modals from 'components/Modals';

export const Container = styled(Modals)`
  div:nth-child(1) {
    margin: 0 auto;

    button:nth-child(1) {
      width: 20px;
      height: 20px;
      top: 10px;
      right: 10px;

      &::before,
      &::after {
        height: 20px;
        background: ${({ theme }) => theme.colors.greenDark};
      }
    }

    ${media.greaterThan('768px')`
      width: 317px;
    `}
  }

  form {
    margin: 0 45px;
  }

  label,
  button {
    width: 226px;
  }

  button {
    width: 226px;
  }
`;

export const Note = styled.p`
  width: 183px;
  font: ${({ theme }) => theme.fontsWeight.medium} 12px/17px 'Raleway';
`;
