import styled from 'styled-components';
import media from 'styled-media-query';

// components
import Modals from 'components/Modals';

export const Container = styled(Modals)`
  div[class*='Wrapper'] {
    margin: 0 auto;
    width: 100%;

    h2 {
      text-transform: none;
    }

    ${media.greaterThan('medium')`
      max-width: 320px;
    `}
  }

  button[class*='ButtonClose'] {
    top: 10px;
    right: 10px;

    &:before,
    &:after {
      background: ${({ theme }) => theme.colors.greenDark};

      ${media.greaterThan('medium')`
        height: 20px;
      `}
    }
  }

  form {
    margin: 0 auto;
    max-width: 230px;
    width: 100%;

    button[type='submit'] {
      width: 100%;
    }
  }
`;

export const FormFeedback = styled.p`
  margin-top: 10px;
  font: 14px 'Raleway';
  color: ${({ theme }) => theme.colors.orange};

  ${props => props.themeColor && css`
    color: ${({ theme }) => theme.colors[props.themeColor]};
  `}
`;


export const Note = styled.p`
  width: 183px;
  font: ${({ theme }) => theme.fontsWeight.medium} 12px/17px 'Raleway';
`;
