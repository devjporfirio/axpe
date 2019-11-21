import styled from 'styled-components';
import media from 'styled-media-query';
import Button from 'components/Button';
import FormElements from 'components/FormElements';

export const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.greyLight};
`;

export const Body = styled.div`
  padding: 30px;
`;

export const Form = styled.form`
  ${media.greaterThan('medium')`
    max-width: 888px;
    margin: auto;
  `}
`;

export const FormRow = styled.div`
  ${media.greaterThan('medium')`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    div {
      flex-basis: 49%;
    }

    label {
      margin-bottom: 0;
    }
  `}
`;

export const FormGroupTwo = styled.div`
  display: flex;
  height: 35px;
`;

export const FormGroupValues = styled.div`
  ${media.greaterThan('medium')`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 560px;

    label {
      width: 270px;
      margin-bottom: 30px;
    }

    p {
      position: absolute;
      margin-top: 50px;
    }
  `}
`;

export const FormGroupFlex = styled.div`
  ${media.greaterThan('medium')`
    display: flex;

    label + label {
      margin-left: 26px;
    }

    label {
      height: 50px;
    }
  `}
`;

export const FormGroupAddress = styled.div`
  ${media.greaterThan('medium')`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    label:nth-child(1),
    label:nth-child(3) {
      flex-basis: 20%;
    }
    label:nth-child(2) {
      flex-basis: 55%;
    }
    label:nth-child(4),
    label:nth-child(5) {
      max-width: 49%;
    }

    p {
      margin-left: 51%;
    }
  `}
`;

export const FormGroupPhotos = styled.div`
  ${media.greaterThan('medium')`
    display: flex;
    align-items: center;
  `}
`;

export const Description = styled.p`
  font: 14px/18px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  margin-bottom: 30px;

  ${media.greaterThan('medium')`
    width: 255px;
    margin-right: 29px;
    margin-bottom: 0;
  `}
`;

export const InfoLogin = styled.div`
  width: 100%;
  height: 190px;
  padding-top: 23px;

  svg {
    position: absolute;
    margin-top: -23px;
    margin-left: 15px;
  }

  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.white};
    width: 370px;
    min-width: 360px;
    height: 88px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-right: 42px;

    svg {
      width: 32px;
      height: 46px;
      position: initial;
      margin: 0;
    }
  `}
`;

export const Info = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  height: 167px;
  padding: 49px 15px 0 15px;

  p,
  a {
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

  ${media.greaterThan('medium')`
    height: auto;
    padding: 0;

    a {
      color: ${({ theme }) => theme.colors.orange};
      margin: 0;
      display: inline;
    }
  `}
`;

export const FormGroupFooter = styled.div`
  ${media.greaterThan('medium')`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 50px 0 100px 0;

    div {
      order: 1;
    }

    label {
      order: 2;
      margin: 0;
    }

    button {
      order: 3;
    }
  `}
`;

export const CheckLinkTerms = styled(FormElements)`
  margin: 30px 0;

  ${media.lessThan('medium')`
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
  `}

  ${media.greaterThan('medium')`
    min-width: 250px;
    width: 250px;

    span {
      font-size: 10px;
    }
  `}
`;

export const ButtonSubmit = styled(Button)`
  width: 100%;
  margin-top: 20px;

  ${media.greaterThan('medium')`
    width: 181px;
  `}
`;
