import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import MyAccount from '..';

// components
import Button from 'components/Button';
import FormElements from 'components/FormElements';

export const Container = styled(MyAccount)`
  h2 {
    font: ${({ theme }) => theme.fontsWeight.medium} 17px/20px 'Raleway';
    text-transform: none;
    margin: 30px 0 15px;
  }

  h2:nth-child(1) {
    margin: 30px 0 20px;
  }
`;

export const Body = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 15px 34px;
`;

export const Form = styled.form`
  margin-top: 30px;

  label {
    background-color: ${({ theme }) => theme.colors.greyLight};

    strong {
      font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
    }
  }
`;

export const ButtonCommon = css`
  width: 100%;

  ${media.greaterThan('medium')`
    width: 185px;
  `}
`;

export const ButtonPass = styled(Button)`
  ${ButtonCommon};
  background-color: ${({ theme }) => theme.colors.greenLight};
  margin-top: 25px;
`;

export const ButtonSave = styled(Button)`
  ${ButtonCommon};
  margin: 15px 0 26px 0;
`;

export const FormElementsCheck = styled(FormElements)`
  background-color: unset !important;

  input {
    width: 40px;
    height: 40px;
  }
`;

export const FormSocial = styled.div`
  display: flex;
  margin: 14px 0 30px 0;

  p {
    font: ${({ theme }) => theme.fontsWeight.semiBold} 14px/18px 'Raleway';
    width: 94px;
  }

  svg {
    width: 40px;
    height: 40px;
    margin-left: 12px;
  }
`;

export const FormGroupElements = styled.div`
  ${media.greaterThan('medium')`
    display: flex;
    justify-content: space-between;
    max-width: 671px;
    width: 100%;

    label:nth-child(1){
      max-width: 259px;
    }
    label:nth-child(2){
      max-width: 370px;
    }
  `}
`;

export const FormGroupAlerts = styled.div`
  ${media.greaterThan('medium')`
    display: flex;
    align-items: center;
    max-width: 777px;
    width: 100%;

    input {
      width:21px;
      height: 21px;
      margin-top: 10px;
    }
  `}
`;
