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

export const Items = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 974px;
  padding: 30px 50px;

  ${media.greaterThan('medium')`
    padding: 50px 5px;

    .slick-track {
      margin: 0;
    }

    div[class*='Column'] {
      padding-left: 10px;
      padding-right: 10px;
    }
  `}

  ${media.greaterThan('1280px')`
    padding: 50px 0;
  `}

  hr {
    max-width: 100%;
    display: none;

    ${media.greaterThan('medium')`
      display: block;
    `}
  }
`

export const ItemsTitle = styled.h3`
  text-align: left;
  font-size: 20px;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.orange};
  font-weight: ${({ theme }) => theme.fontsWeight.bold};

  ${media.greaterThan('medium')`
    font-size: 25px;
    padding: 0 10px;
  `}
`
