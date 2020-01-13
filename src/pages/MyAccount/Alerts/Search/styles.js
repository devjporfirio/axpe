import styled from 'styled-components';
import media from 'styled-media-query';

import { SourceUse } from 'pages/MyAccount/Alerts/styles';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.greyLight};
  min-height: 100vh;
`;

export const Body = styled.div`
  padding: 21px 26px;

  ${media.greaterThan('medium')`
    max-width: 955px;
    margin: auto;
    padding: 0;
  `}
`;

export const Title = styled(SourceUse)`
  font-size: 16px;
  line-height: 32px;
  padding: 0;

  ${media.greaterThan('medium')`
    display: inline-block;
    margin-right: 21px;
    margin-top: 85px;
  `}
`;

export const Subtitle = styled.p`
  font: 12px/20px 'Raleway';

  ${media.greaterThan('medium')`
    display: inline-block;
  `}
`;

export const Amount = styled.h4`
  margin-top: 19px;
  font: ${({ theme }) => theme.fontsWeight.bold} 22px/28px 'Bitter';

  strong {
    color: ${({ theme }) => theme.colors.orange};
  }

  ${media.greaterThan('medium')`
    font-size: 41px;
    line-height: 56px;
    margin-top: 14px;
  `}
`;

export const Buildings = styled.div`
  margin-top: 30px;
`;
