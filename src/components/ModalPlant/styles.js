import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Modal from 'components/Modal';
import Slider from 'components/Slider';

export const Container = styled(Modal)`
  background-color: ${({ theme }) => theme.colors.greyLight};
  width: 100vw;
  display: flex;
  justify-content: space-between;

  hr {
    border: 2px solid ${({ theme }) => theme.colors.orange};
    width: 60px;
    margin: 21px 0;
  }

  span {
    font: 16px 'RalewayRegular';
  }

  ${media.greaterThan('769px')`
    width: 70%;
    height: 70vh;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    padding: 90px 60px;
  `}
`;

export const Category = styled.h2`
  font: 37px 'BitterRegular';
  color: ${({ theme }) => theme.colors.greenDark};
  margin-bottom: 38px;
`;

export const Left = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const Infos = styled.div`
  height: auto;
  max-width: 250px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  p {
    color: ${({ theme }) => theme.colors.greenDark};
    font: 16px 'RalewayBold';
  }
`;

export const Right = styled(Slider)`
  width: 70%;
  height: 70vh;
`;

export const ImagesGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 300px;
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
