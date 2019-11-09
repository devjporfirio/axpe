import styled from 'styled-components';
import media from 'styled-media-query';
import Button from 'components/Button';

export const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.greyLight};
`;

export const Form = styled.form`
  max-width: 1000px;
  padding: 50px 30px;
  margin: auto;

  h1 {
    font: 24px 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }

  ${media.greaterThan('medium')`
    padding: 50px 0 0 0;
  `}
`;

export const FormGroupButton = styled.div`
  width: auto;
  margin: 30px 16px;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${media.greaterThan('medium')`
    max-width: 1000px;
    margin: auto;
    padding: 50px 0;
    flex-direction: row;
  `}
`;

export const ButtonContainer = styled(Button)`
  width: 100%;
  margin-top: 28px;

  ${media.greaterThan('medium')`
    width: auto;
    margin-top: 0;
  `}
`;
