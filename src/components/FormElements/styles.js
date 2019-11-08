import styled, { css } from 'styled-components';

export const Label = styled.label`
  display: block;
  overflow: auto;
  position: relative;
  min-height: 45px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  width: 100%;
  margin-bottom: 16px;

  input ~ span {
    transition: top 0.2s ease;
    position: absolute;
    top: 15px;
  }

  ${props =>
    props.type === 'area' &&
    css`
      height: 100px;
    `}
`;

export const Span = styled.span`
  font: 14px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  color: ${({ theme }) => theme.colors.green};
  padding-left: 12px;
`;

const BaseInput = css`
  position: absolute;
  top: 20px;
  height: 16px;
  width: 100%;
  padding-left: 12px;
  border: none;
  color: ${({ theme }) => theme.colors.green};
  font: 14px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: text;
  -webkit-appearance: none;

  &:not(:placeholder-shown) + span,
  &:focus ~ span {
    top: 6px;
    font-size: 10px;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.green};
    font: 14px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
    opacity: 0;
  }

  &:focus {
    outline: 0;
  }
`;

export const Input = styled.input`
  ${BaseInput}
`;

export const InputCheckbox = styled.label`
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

  height: 45px;
  top: 0;

  width: 100%;
  appearance: none;
`;

export const InputTextArea = styled.textarea`
  ${BaseInput}
  height: 100px;
  top: 8px;
`;
