import styled, { css } from 'styled-components';
import Phone from 'components/Phone';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.greyLight};

  hr {
    border: 2px solid ${({ theme }) => theme.colors.orange};
    width: 55px;
    margin: 30px 0;
  }
`;

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.green};
  padding: 30px;

  span {
    font-size: 22px;
    line-height: 28px;
  }
`;

export const SubText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font: 16px/19px 'Raleway';
  font-weight: 500;
  margin: 20px 0;
`;

const Phones = css`
  color: ${({ theme }) => theme.colors.white};
  margin-top: 10px;
`;

export const Tel = styled(Phone)`
  ${Phones}
`;

export const Whats = styled(Phone)`
  ${Phones}
`;

export const PhoneNumber = styled.div`
  font: 16px/19px 'Raleway';

  p {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Numbers = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Form = styled.form`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    font: 14px/22px 'Raleway';
    font-weight: 500;
  }

  h2 {
    font: 16px/18px 'Raleway';
    font-weight: 500;
    text-transform: uppercase;
    width: 100%;
    margin-top: 30px;
  }
`;

export const Mapa = styled.div``;
