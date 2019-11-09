import styled, { css } from 'styled-components';
import MaskedInput from 'react-text-mask';

export const Label = styled.label`
  display: block;
  overflow: auto;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  width: 100%;

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

  ${props =>
    props.type === 'checkbox' &&
    css`
      padding-left: 0;
      background: none;

      span {
        position: initial;
        top: 0 !important;
        width: calc(100% - 47px);
        font: 14px 'Raleway';
        font-weight: ${({ theme }) => theme.fontsWeight.medium};
        padding-left: 11px;
        max-width: 200px;
        line-height: 14px;

        a {
          text-decoration: underline;
          color: ${({ theme }) => theme.colors.orange};
        }
      }
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

export const FormGroup = styled.div`
  width: 100%;

  label {
    margin-bottom: 16px;
    min-height: 45px;
  }

  h1,
  h2 {
    font: 18px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
    text-transform: uppercase;
    width: 100%;
    margin: 30px 0 17px 0;
  }
`;

export const PhoneMask = styled(MaskedInput)`
  ${BaseInput}
`;

export const EmailMask = styled(MaskedInput)`
  ${BaseInput}
`;

export const Input = styled.input`
  ${BaseInput}
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
