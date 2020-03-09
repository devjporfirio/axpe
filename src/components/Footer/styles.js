import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.footer`
  padding: 30px;
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  background: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.greenDark};
    text-decoration: underline;
  }
`;

export const Wrapper = styled.div`
  ${media.greaterThan('large')`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`;

export const Socials = styled.div`
  display: none;

  ${media.greaterThan('large')`
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `}
`;

export const SocialButton = styled.a`
  text-decoration: none;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export const Copy = styled.p`
  margin-bottom: 10px;
  line-height: 15px;

  span {
    display: none;
  }

  ${media.greaterThan('large')`
    margin: 0 auto;

    span {
      display: inline-block;
    }
  `}
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin: 0 5px;
  }

  ${media.greaterThan('large')`
    & > a:first-child,
    & > span {
      display: none;
    }
  `}
`;

export const FutureBrand = styled.p`

`;