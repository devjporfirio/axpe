import styled from 'styled-components';
import media from 'styled-media-query';
import Slider from 'components/Slider';

export const Container = styled.div`
  width: 100vw;
  padding-bottom: 20px;
  background-color: #91a8ab;

  ${media.greaterThan('medium')`
    max-width: 1000px;
    width: 100%;
    margin: auto;
    border-radius: 6px;
  `}
`;

export const Title = styled.h2`
  padding: 30px 40px;
  max-width: 420px;

  span {
    color: ${({ theme }) => theme.colors.white};
    font: 40px 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }

  span:nth-child(2) {
    color: ${({ theme }) => theme.colors.green};
    font: 40px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.black};
  }

  ${media.greaterThan('medium')`
    padding: 45px 80px;
  `}
`;

export const Reasons = styled(Slider)`
  width: 100%;
  margin: auto;

  & > button {
    &:first-of-type {
      left: 5px;
    }

    &:last-of-type {
      right: 5px;
    }
  }

  .building-lovely-item {
    position: relative;
    margin: auto;
    display: flex !important;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 270px;
    padding: 30px 60px;

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      width: calc(100% - 80px);
      height: 100%;
      border-radius: 7px;
      background-color: ${({ theme }) => theme.colors.greyLight};
      z-index: 1;
      transform: translateX(-50%);
    }

    h3,
    p {
      position: relative;
      width: 100%;
      z-index: 2;
    }

    h3 {
      margin-bottom: 23px;
      color: ${({ theme }) => theme.colors.orange};
      font: 18px/20px 'Bitter';
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
    }

    p {
      color: ${({ theme }) => theme.colors.greenDark};
      font: 16px/19px 'Raleway';
    }

    ${media.greaterThan('medium')`
      width: 160px;
      padding: 14px 25px;

      &:before {
        width: calc(100% - 20px);
      }

      h3, p {
        width: 100%;
      }
    `}
  }

  ${media.greaterThan('medium')`
    width: 90%;
    height: 272px;

    & > button {
      &:first-of-type {
        left: -30px;
      }

      &:last-of-type {
        right: -30px;
      }
    }
  `}
`;
