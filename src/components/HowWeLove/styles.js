import styled from 'styled-components';
import media from 'styled-media-query';
import Slider from 'components/Slider';

export const Container = styled.div`
  width: 100vw;
  height: 552px;
  background-color: #91a8ab;

  ${media.greaterThan('medium')`
    max-width: 1000px;
    width: 100%;
    margin: auto;
    height: 564px;
  `}
`;

export const Title = styled.div`
  padding: 30px 40px;
  max-width: 342px;

  span {
    color: ${({ theme }) => theme.colors.white};
    font: 40px 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }

  span:nth-child(2) {
    color: ${({ theme }) => theme.colors.greenDark};
    font: 40px 'Raleway';
  }

  ${media.greaterThan('medium')`
    padding: 45px 80px;
  `}
`;

export const Reasons = styled(Slider)`
  width: 90%;
  margin: auto;
`;

export const Section = styled.section`
  margin: auto;
  background-color: ${({ theme }) => theme.colors.greyLight};
  height: 270px;
  border-radius: 7px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 264px;

  h1 {
    color: ${({ theme }) => theme.colors.orange};
    font: 18px/20px 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
    margin-bottom: 23px;
  }

  p {
    color: ${({ theme }) => theme.colors.greenDark};
    font: 16px/19px 'Raleway';
  }

  h1,
  p {
    width: 156px;
  }

  ${media.greaterThan('medium')`
    max-width: 156px;

    h1 , p {
      width: 126px;
    }
  `}
`;
