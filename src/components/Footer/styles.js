import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.green};
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 268px;
  padding: 30px;

  div {
    width: 315px;
    margin-top: 24px;

    p {
      font-family: 'RalewayRegular';
      font-size: 18px;
      line-height: 21px;
      color: ${({ theme }) => theme.colors.white};
      margin-bottom: 24px;
    }

    button {
      width: 100%;
    }
  }

  ${media.greaterThan('769px')`
    justify-content: space-around;

    div {
      width: 240px;
    }
  `}
`;

export const Highlighted = styled.p`
  font-family: 'RalewayBlack';
  font-size: 40px;
  line-height: 47px;
  text-align: left;
  color: ${({ theme }) => theme.colors.white};
  width: 315px;

  span:nth-child(1) {
    color: ${({ theme }) => theme.colors.greenLight};
  }
  span:nth-child(3) {
    color: ${({ theme }) => theme.colors.orange};
  }
`;
