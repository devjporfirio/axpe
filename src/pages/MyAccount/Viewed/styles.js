import styled from 'styled-components';
import media from 'styled-media-query';
import MyAccount from '..';

export const Container = styled(MyAccount)`
  hr {
    display: none;
  }

  ${media.greaterThan('medium')`
    hr {
      display: block;
      max-width: calc(100% - 95px);
      border: 1px solid ${({ theme }) => theme.colors.greyDark};
    }
  `}
`;
