import styled from 'styled-components';
import media from 'styled-media-query';

export const LoginContainer = styled.div`
  padding-bottom: 30px;

  ${media.greaterThan('768px')`
    display: flex;
    align-items: flex-start;
  `}

  ${media.greaterThan('768px')`
    display: block;
  `}
`;

export const LoginRow = styled.div`
  &:not(:last-child) {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  }

  ${media.greaterThan('768px')`
    width: 48%;

    &:not(:last-child) {
      border: none;
      padding-right: 2%;
      border-right: 1px solid ${({ theme }) => theme.colors.grey};
      margin-right: 6%;
    }

    &:last-child {
      width: 46%;
    }
  `}

  ${media.greaterThan('1024px')`
    width: 100%;

    &:not(:last-child) {
      border-right: none;
      padding-right: 0;
      margin-right: 0;
      border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
    }

    &:last-child {
      width: 100%;
    }
  `}
`;

export const LoginForm = styled.form`
  margin-top: 17px;

  label {
    height: 40px;
    background-color: ${({ theme }) => theme.colors.grey};
    margin-bottom: 14px;
  }
`;

export const LoginFeedback = styled.p`
  margin-top: 10px;
  font: 14px 'Raleway';
  color: ${({ theme }) => theme.colors.orange};
`