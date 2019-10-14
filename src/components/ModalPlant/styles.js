import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Modal from 'components/Modal';
import Slider from 'components/Slider';

export const Container = styled(Modal)`
  background-color: ${({ theme }) => theme.colors.greyLight};
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  hr {
    border: 2px solid ${({ theme }) => theme.colors.orange};
    width: 60px;
    margin: 0 0 20px 0;

    ${media.greaterThan('769px')`
      margin: 21px 0;
    `}
  }

  span {
    font: 16px 'RalewayRegular';
    width: 100%;
  }

  ${media.greaterThan('769px')`
    width: 85%;
    height: 70vh;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    padding: 90px 40px;
    flex-direction: row;
    justify-content: space-between;
  `}
`;

export const Category = styled.h2`
  font: 37px 'BitterRegular';
  color: ${({ theme }) => theme.colors.greenDark};
  margin-bottom: 38px;
  width: 50%;
`;

export const Left = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.greaterThan('769px')`
    width: 30%; 
    flex-direction: column;
  `}
`;

export const Infos = styled.div`
  height: auto;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100vw;
  padding: 20px;

  p {
    color: ${({ theme }) => theme.colors.greenDark};
    font: 16px 'RalewayBold';
  }

  div {
    width: 50%;
  }

  ${media.greaterThan('769px')`
    flex-direction: column;
    max-width: 250px;
  `}
`;

export const Right = styled(Slider)`
  width: 90vw;
  margin: 40px auto 0 auto;

  ${media.greaterThan('769px')`
    width: 65vh;
    height: 65vh;
    margin: 0;
  `}
`;

export const ImagesGroup = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  width: 100vw;
  left: 0;
  overflow-x: auto;
  justify-content: center;
  margin-left: 5px;

  ${media.greaterThan('769px')`
    flex-wrap: wrap;
    max-width: 300px;
    width: 90vw;
  `}
`;

export const Image = styled.img`
  margin: 5px;
  width: 80px;
  height: 80px;

  ${props =>
    props.selected &&
    css`
      box-sizing: border-box;
      border: 3px solid ${({ theme }) => theme.colors.orange};
    `}
`;
