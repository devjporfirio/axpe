import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const LoginContainer = styled.div`
  padding-bottom: 30px;

  ${media.greaterThan('768px')`
    display: flex;
    align-items: flex-start;
  `}

  ${media.greaterThan('1024px')`
    display: block;

    ${props => props.type === 'register' && css`
      padding-top: 40px;
      padding-bottom: 0;
    `}
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

export const LoginFormContainer = styled.form`
  margin-top: 17px;

  label {
    height: 40px;
    background-color: ${({ theme }) => theme.colors.grey};
    margin-bottom: 14px;
  }
`;

export const RegisterFormContainer = styled.form`
  label {
    height: 40px;
    margin-bottom: 14px;

    &:not([for="terms"]) {
      background-color: ${({ theme }) => theme.colors.grey};
    }
  }
`;

export const ForgotPassButton = styled.button`
  margin-top: 10px;
  font-size: 12px;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.greenDark};
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  transition: all 300ms ease;

  ${media.greaterThan('large')`
    &:hover {
      color: ${({ theme }) => theme.colors.orange};
    }
  `}
`;