import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyDark};
  background-color: ${({ theme }) => theme.colors.white};

  ${media.greaterThan('769px')`
    height: 40px;
    border: none;
  `}
`;

export const Category = styled.p`
  font: 18px/32px 'Bitter';

  ${media.greaterThan('769px')`
    margin-right: 20px;
  `}
`;

export const Local = styled.p`
  font: 14px/28px 'Raleway';
  font-weight: 700;
  color: ${({ theme }) => theme.colors.orange};
  text-transform: uppercase;
`;

export const InfoLeft = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 20px;

    ${media.greaterThan('769px')`
      flex-direction: row;
      align-items: center;
    `}
  }
`;

export const InfoRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    width: 155px;
    height: 32px;
    font-size: 13px;
    line-height: 32px;
    border-radius: 6px;
  }

  ${media.greaterThan('769px')`
    justify-content: space-between;
    width: 400px;
  `};

  ${media.lessThan('medium')`
    span, button, a {
      display: none;
    }
  `};
`;

export const Reference = styled.span`
  font: 14px 'Bitter';
  width: 90px;
`;

export const FavoriteMobile = styled.img`
  ${media.greaterThan('769px')`display: none;`}
  width: 25px;
`;
export const FavoriteDesktop = styled.div`
  ${media.lessThan('medium')`display: none;`}

  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font: 13px/15px 'Bitter';
  }

  img {
    width: 20px;
    margin-left: 2px;
  }
`;

export const BackMobile = styled.a`
  ${media.greaterThan('769px')`display: none;`}
`;
export const BackDesktop = styled.a`
  ${media.lessThan('medium')`display: none;`}

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85px;

  span {
    font: 14px 'Raleway';
    font-weight: 600;
    color: ${({ theme }) => theme.colors.orange};
    text-transform: uppercase;
  }
  img {
    height: 16px;
  }
`;
