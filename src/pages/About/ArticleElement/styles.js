import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};

  img {
    padding-bottom: 40px;
    height: 522px;
  }

  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.white};
    margin-bottom: 40px;

    header {
      background-color: ${({ theme }) => theme.colors.greyLight};
      width: 664px;
      height: 290px;

      h2 {
        width: 466px;
        padding: 40px 0 0 97px;
      }
    }
    img {
      width: 427px;
      height: 594px;
      padding: 0;
      position: absolute;
      margin-top: -240px;
      left: 61%;
    }

    p {
      padding: 0;
      margin: 40px 97px;
      width: 400px;
    }
  `}

  ${media.between('medium', '1280px')`
    img {
      left: auto;
      margin-left: 517px;
    }

    h2 {
      padding: 30px 35px !important;
    }

    p {
      margin: 40px 35px;
    }
  `}
`;

export const Group = styled.div`
  ${media.greaterThan('medium')`
    width: 421px;

    p {
      padding: 0;
      width: 100%;
    }
  `}
`;
