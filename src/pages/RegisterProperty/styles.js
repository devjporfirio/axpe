import styled from 'styled-components';
import Button from 'components/Button';
import FormElements from 'components/FormElements';

export const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.greyLight};
`;

export const Body = styled.div`
  padding: 30px;
`;

export const Form = styled.form``;

export const FormGroupTwo = styled.div`
  display: flex;
  height: 35px;
`;

export const Description = styled.p`
  font: 14px/18px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  margin-bottom: 30px;
`;

export const InfoLogin = styled.div`
  height: 190px;
  padding-top: 23px;

  svg {
    position: absolute;
    margin-top: -23px;
    margin-left: 15px;
  }
`;

export const Info = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  height: 167px;

  p,
  a {
    padding: 49px 15px 0 15px;
    font: 14px/18px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};

    strong {
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
    }
  }

  a {
    padding: 0;
    margin-left: calc(100% - 88px);
    text-decoration: underline;
    display: block;
    margin-top: -18px;
  }
`;

export const CheckLinkTerms = styled(FormElements)`
  margin: 30px 0;

  input {
    width: 40px;
    height: 40px;

    &:checked {
      background-size: initial;
      background-position: 10px;
    }
  }

  span {
    margin-top: 9px;
    max-width: initial;
  }
`;

export const ButtonPhotos = styled(Button)`
  width: 100%;
`;

export const ButtonSubmit = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;
