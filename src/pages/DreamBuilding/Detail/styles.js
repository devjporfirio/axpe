import styled, { css } from 'styled-components';
import media from 'styled-media-query';

// styles
import { FormGroup } from 'components/FormElements/styles';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.greyLight};
`;

export const Wrapper = styled.div`
  padding: 30px;
  max-width: 940px;
  margin: 0 auto;

  ${media.greaterThan('large')`
    padding-left: 0;
    padding-right: 0;
  `}
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
  padding-bottom: 30px;
`;

export const FormGroupContainer = styled(FormGroup)`
  ${props => props.mq === 'desktop' && css`
    display: none;

    ${media.greaterThan('medium')`
      display: block;
    `}
  `}

  h2 {
    letter-spacing: 1px;

    ${media.greaterThan('medium')`
      margin-bottom: 25px;
    `}

    strong {
      display: block;
      margin-top: 5px;
      font-size: 16px;
      text-transform: none;
      letter-spacing: 0;
      font-weight: ${({ theme }) => theme.fontsWeight.regular};

      ${media.greaterThan('medium')`
        font-weight: ${({ theme }) => theme.fontsWeight.bold};
      `}
    }
  }
`;

export const FormList = styled.ul`
  ${media.greaterThan('medium')`
    display: flex;
    flex-wrap: wrap;
  `}
`;

export const FormListItem = styled.li`
  line-height: 0;

  ${media.greaterThan('medium')`
    width: 25%;
  `}

  input {
    margin: 0;
  }

  label {
    min-height: 0 !important;
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

  ${media.greaterThan('medium')`
    display: none;
  `}

  strong {
    display: block;
    text-align: left;
    margin-top: 5px;
    font-size: 16px;
    text-transform: none;
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }
`;

export const FormCols = styled.div`
  ${media.greaterThan('medium')`
    display: flex;
    flex-wrap: wrap;
  `}
`;

export const FormCol = styled.div`
  margin-bottom: 25px;

  ${media.greaterThan('medium')`
    width: 48%;

    ${props => props.layout === 'half' && css`
      width: 100%;
    `}

    ${props => props.last && css`
      margin-left: 4%;
    `}
  `}

  ${media.greaterThan('large')`
    width: 22%;

    ${props => props.layout === 'half' && css`
      width: 48%;
    `}

    ${props => props.layout === 'bedrooms' && css`
      margin-left: 4%;
    `}
  `}

  h3 {
    margin-bottom: 10px;
    text-transform: uppercase;
    font-size: 17px;
    line-height: 18px;
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
    letter-spacing: 1px;
  }
`;

export const ButtonSubmitContainer = styled.div`
  width: 100%;
  margin-top: 20px;

  ${media.greaterThan('medium')`
    display: flex;
    justify-content: flex-end;
  `}

  button {
    ${media.greaterThan('medium')`
      width: 180px;
    `}
  }
`;