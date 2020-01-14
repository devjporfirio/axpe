import styled from 'styled-components';
import { Texts, Column } from 'components/Modals/styles';
import InfoUser from 'components/InfoUser';

export const Form = styled.form`
  label {
    background-color: ${({ theme }) => theme.colors.grey};
    border-radius: 4px;
  }
`;

export const TextContact = styled(Texts)`
  width: 60% !important;

  h2 {
    font: 40px/47px 'Raleway';
    strong {
      font-weight: ${({ theme }) => theme.fontsWeight.black};
    }
  }
`;

export const ColumnContact = styled(Column)`
  width: 40% !important;
`;

export const InfoUserContact = styled(InfoUser)`
  margin-left: -20px;
  justify-content: flex-start;
  width: auto;
  background: none;
  margin-top:20px;

  svg {
    width: 20px;
    height: 30px;
    margin-right: 16px;
  }
`;