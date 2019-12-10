import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};

  img {
    padding-bottom: 40px;
    height: 362px;
  }

  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.white};

    header {
      background-color: ${({ theme }) => theme.colors.greyLight};
      width: 721px;
      height: 305px;
      margin-top: 697px;

      h2 {
        padding: 40px 0 0 122px;
        width: 514px;
      }
    }
    
    img {
      width: calc(100% - 200px);
      height: 698px;
      padding: 0;
      position: absolute;
      margin-top: -1002px;
    }
  `}

  ${media.between('medium', '1280px')`
    header {
      width: 477px;
      h2 {
        padding: 30px 35px;
      }
    }
  `}

  ${media.between('medium', '1024px')`
    img {
      width: 100%;
    }
  `}
`;

export const Group = styled.div`
  ${media.greaterThan('medium')`

  `}
`;

export const GroupText = styled.div`
  ${media.greaterThan('medium')`
    position: absolute;
    margin-left: 783px;
    margin-top: -215px;
    width: 302px;

    p {
      padding: 0;
    }

    hr {
      margin: 22px 0 26px 0;
    }
  `}

  ${media.between('medium', '1280px')`
      margin-left: 536px
  `}
`;
