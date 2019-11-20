import styled, { css } from 'styled-components';
import media from 'styled-media-query';
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
    props.children[1] &&
    css`
      input::placeholder {
        opacity: 0;
      }
    `} 

  ${props =>
    props.type === 'select' &&
    props.children[0].props.placeholder &&
    css`
      select {
        padding-top: 10px;
      }
      span {
        position: absolute;
        top: 4px;
        font-size: 10px;
      }
    `}


  ${props =>
    props.type === 'area' &&
    css`
      height: 100px;
    `}


  ${props =>
    [ 'checkboxLink', 'checkbox' ].includes(props.type) &&
    css`
      padding-left: 0;
      background: none;

      span {
        position: initial;
        top: 5px !important;

        a {
          text-decoration: underline;
          color: ${({ theme }) => theme.colors.orange};
        }
      }
    `}


  ${props =>
    props.type === 'checkboxLink' &&
    css`
      span {
        padding-left: 11px;
        max-width: 230px;
        line-height: 14px;
        top: 0 !important;

        ${media.greaterThan('medium')`width: calc(100% - 47px);`}
      }

      input {
        width: 27px;
        height: 27px;
      }
    `}
`;

export const Span = styled.span`
  font: 14px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  color: ${({ theme }) => theme.colors.green};
  padding-left: 12px;
`;

export const Message = styled.p`
  font: 12px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  color: ${({ theme }) => theme.colors.green};
  margin-top: -12px;
  margin-bottom: 10px;
`;

const BaseInput = css`
  position: absolute;
  top: 20px;
  height: 25px;
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
    color: ${({ theme }) => theme.colors.greyDark2};
    font: 14px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }

  &:focus {
    outline: 0;
    &::placeholder {
      opacity: 1;
    }
  }
`;

export const FormGroupYesNo = styled.div`
  ${media.greaterThan('medium')`
    max-width: 175px;
    display: flex;
    align-items: center;

    label {
      width: auto;
      margin-bottom: 0;
      width: 90px;
    }
  `}
`;

export const FormGroup = styled.div`
  width: 100%;

  label {
    margin-bottom: 16px;
    min-height: 45px;
  }

  h2 {
    font: 16px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
    text-transform: uppercase;
    width: 100%;
    margin: 30px 0 17px 0;

    ${media.greaterThan('medium')`font-size: 18px;`}
  }
`;

export const BaseMask = styled(MaskedInput)`
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

  & + svg {
    transform: rotate(90deg);
    margin-left: calc(100% - 31px);
    position: absolute;
    margin-top: 12px;
    width: 16px;
  }
`;

export const InputTextArea = styled.textarea`
  ${BaseInput}

  height: 90px;
  top: 8px;
`;
