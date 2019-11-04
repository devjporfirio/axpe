import styled, { css } from 'styled-components';

const BaseInput = css`
  height: 45px;
  width: 100%;
  margin-bottom: 15px;
  padding-left: 15px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.green};
  font: 14px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.green};
  }
`;

export const Input = styled.input`
  ${BaseInput}
`;

export const InputCheckbox = styled.label`
  ${BaseInput};
  background: none;
  padding-left: 0;

  span {
    display: block;
    width: calc(100% - 47px);
    float: right;
    font: 16px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};

    a {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.orange};
    }
  }

  input {
    width: 27px;
    height: 27px;
    margin-right: 10px;
  }
`;

export const InputSelect = styled.select`
  ${BaseInput}
  width: 100%;
  appearance: none;
`;

export const InputTextArea = styled.textarea`
  ${BaseInput}
`;
