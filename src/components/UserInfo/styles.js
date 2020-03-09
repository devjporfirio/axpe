import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.white};

  ${props => props.asInclude && css`
    padding-left: 0;
    padding-right: 0;
  `}

  svg {
    display: block;
    margin-right: 20px;
    width: 32px;
    height: 46px;
  }
`;

export const Text = styled.div`
  p {
    font-size: 14px;
    line-height: 18px;
    font-weight: ${({ theme }) => theme.fontsWeight.medium};

    strong {
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
    }
  }

  ${media.greaterThan('medium')`
    max-width: 300px;
  `}
`;

export const LinkLogout = styled.a`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.orange};
`;