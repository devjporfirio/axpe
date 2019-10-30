import styled, { css } from 'styled-components';

const BaseInput = css`
  height: 45px;
  width: calc(100% - 15px);
  margin-bottom: 15px;
  padding-left: 15px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.green};
  font: 14px 'RalewayMedium';

  &::placeholder {
    color: ${({ theme }) => theme.colors.green};
  }
`;

export const Input = styled.input`
  ${BaseInput}
`;

export const InputCheckbox = styled.input`
  /* ${BaseInput} */
`;

export const InputSelect = styled.select`
  ${BaseInput}
  width: 100%;
  appearance: none;
`;

export const InputTextArea = styled.textarea`
  ${BaseInput}
`;
