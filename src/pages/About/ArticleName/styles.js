import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};

  img {
    padding-bottom: 40px;
    height: 362px;
  }

  hr {
    margin-bottom: 26px;
  }

  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.white};
    padding-bottom: 100px;

    header {
      background-color: ${({ theme }) => theme.colors.greyLight};
      width: 477px;
      height: 305px;
      margin-top: 697px;
    }
    
    img {
      width: 954px;
      height: 697px;
      padding: 0;
      position: absolute;
      margin-top: -1002px;
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
    margin-left: 507px;
    margin-top: -215px;
  `}
`;
