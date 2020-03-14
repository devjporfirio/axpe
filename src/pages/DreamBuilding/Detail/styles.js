import styled, { css } from 'styled-components';
import media from 'styled-media-query';

// styles
import { FormGroup } from 'components/FormElements/styles';

export const Container = styled.div`

`;

export const Wrapper = styled.div`
  padding: 30px;
`;

export const Breadcrumb = styled.div`
  margin-bottom: 20px;
  font-size: 18px;

  a,
  span {
    font-family: 'Bitter';
    color: ${({ theme }) => theme.colors.greenDark};
  }

  span {
    margin: 0 10px;
  }

  strong {
    text-transform: uppercase;
    font-size: 14px;
    line-height: 28px;
    color: ${({ theme }) => theme.colors.orange};
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
`;

export const Header = styled.header`
  h2 {
    margin-bottom: 30px;
    font: 25px/30px 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};

    ${media.greaterThan('medium')`
      margin-bottom: 15px;
      font-size: 40px;
      line-height: 48px;
    `}

    strong {
      display: block;
      color: ${({ theme }) => theme.colors.orange};
    }
  }
`;

export const Form = styled.form`

`;

export const FormGroupi = styled(FormGroup)`
  ${props => props.mq === 'desktop' && css`
    display: none;

    ${media.greaterThan('medium')`
      display: block;
    `}
  `}

  h2 strong {
    display: block;
    margin-top: 5px;
    font-size: 16px;
    text-transform: none;
    font-weight: ${({ theme }) => theme.fontsWeight.regular};

    ${media.greaterThan('medium')`
      margin-top: 0;
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
    `}
  }
`;

export const FormList = styled.ul``;

export const FormListItem = styled.li`
  line-height: 0;

  input {
    margin: 0;
  }

  label {
    min-height: 0;
  }

  span {
    top: 50% !important;
  }
`;

export const ButtonLocals = styled.button`
  display: block;
  width: 100%;
  padding: 15px 0;
  font: 18px/21px 'Raleway';
  text-align: left;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.greenDark};
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;

  strong {
    display: block;
    text-align: left;
    margin-top: 5px;
    font-size: 16px;
    text-transform: none;
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }
`;

export const FormCols = styled.div``;

export const FormCol = styled.div``;