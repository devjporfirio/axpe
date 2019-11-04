import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Phone from 'components/Phone';

export const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.greyLight};
`;

export const Body = styled.div`
  ${media.greaterThan('medium')`
    max-width: 1000px;
    margin: auto;
    display: flex;
  `}
`;

export const BlockForm = styled.div`
  ${media.greaterThan('medium')`
    width: 50%;
  `}
`;

export const Message = styled.p`
  font: 14px/22px 'Raleway';
  font-weight: 500;
  padding: 30px 75px 30px 0;
`;

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.green};
  padding: 30px;
`;

const Phones = css`
  color: ${({ theme }) => theme.colors.white};
  margin-top: 10px;
`;

export const Tel = styled(Phone)`
  ${Phones}
  margin-right: 40px;
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

  ${media.greaterThan('medium')`
    justify-content: flex-start;
    max-width: 1000px;
    margin: auto;
  `}
`;

export const Form = styled.form`
  padding: 0 75px 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  width: 100%;

  h1 {
    font: 18px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
    text-transform: uppercase;
    width: 100%;
    margin: 30px 0 17px 0;
  }
`;

export const Mapa = styled.div`
  iframe {
    width: 100%;
    height: 652px;
  }
  ${media.greaterThan('medium')`
    width: 50%;

    iframe {
      height: 1322px;
    }
  `}
`;
