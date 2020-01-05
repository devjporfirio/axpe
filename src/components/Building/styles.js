import styled, { css } from 'styled-components';
import media from 'styled-media-query';

// components
import Gallery from 'components/Slider';
import Button from 'components/Button';

export const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  max-width: calc(100vw - 32px);
  margin: auto auto 20px auto;
  overflow: hidden;
  border-radius: 6px;

  ${props =>
    props.hasDeleted &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 30px;
    `}

  ${media.greaterThan('medium')`
    width: 100%;
    height: ${props =>
      props.useBtSchedule ? (props.hasDeleted ? '45PX' : '386px') : '365px'};
    margin: auto auto 20px auto;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;

    ${props =>
      props.hasDeleted
        ? css`
            justify-content: flex-start;
            flex-direction: row;
            align-items: center;
          `
        : css`
            justify-content: space-between;
            flex-direction: row-reverse;
          `}
  `}

  p, h4 {
    color: ${({ theme }) => theme.colors.greenDark};
  }
`;

export const Infos = styled.div`
  display: block;
  padding: 15px 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};

  ${media.greaterThan('medium')`
    padding: 30px;
  `}

  ${media.greaterThan('1280px')`
    padding: 40px 55px;
  `}
`;

export const Slider = styled(Gallery)`
  height: 244px;

  iframe,
  img {
    height: 244px;
    object-fit: cover;
  }

  ${media.greaterThan('medium')`
    width: 60%;
    height: ${props => (props.useBtSchedule ? '386px' : '365px')};

    iframe, img {
      width: 100%;
      height: ${props => (props.useBtSchedule ? '386px' : '365px')};
    }
  `}
`;

export const CatLocGroup = styled.div`
  div {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    align-items: flex-end;

    div {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export const CategoryRelease = styled.h4`
  font: 16px/19px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  text-transform: uppercase;
`;

export const Category = styled.h4`
  font: 22px/29px 'Bitter';
  letter-spacing: 1px;
`;

export const Local = styled.h4`
  color: ${({ theme }) => theme.colors.orange} !important;
  font: 18px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.bold};
  text-transform: uppercase;

  ${media.greaterThan('medium')`
    font-size: 16px;
  `};
`;

export const Reference = styled.p`
  font: 14px 'Raleway';

  ${media.greaterThan('medium')`
    font-size: 12px;
  `};
`;

export const Description = styled.p`
  font: 16px 'Raleway';
  margin-top: 20px;
  display: block;
  display: -webkit-box;
  max-width: 100%;
  height: 65px;
  line-height: 1;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.greaterThan('medium')`
    height: 49px;
    -webkit-line-clamp: 3;
  `};
`;

export const ReleaseDelivery = styled.p`
  font: 14px 'Raleway';
  background-color: ${({ theme }) => theme.colors.grey};
  height: 35px;
  position: absolute;
  width: 40%;
  margin-top: ${props => (props.useBtSchedule ? '350px' : '330px')};
  margin-left: -60%;
  color: ${({ theme }) => theme.colors.greenDark};
  text-align: center;
  line-height: 35px;

  span {
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  }
`;

const CenterBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CaracteristicsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  div {
    margin-top: 15px !important;
    height: 40px;
    flex: 0 50%;

    p {
      font-size: 16px !important;
    }
  }

  ${media.greaterThan('medium')`
    div {
      margin-top: 20px;
      height: 31px;
      flex: 0 50%;
    }
    p{ 
      font-size: 14px !important;
      line-height: 14px !important;
    }
  `};
`;

export const ValuesFavGroup = styled.div`
  ${CenterBetween};
  margin-top: 15px;
`;

export const Favorito = styled.img`
  width: 16px;
`;

export const Price = styled.p`
  width: 100%;
  font: 18px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.bold};
  line-height: 28px;

  ${media.greaterThan('medium')`
    line-height: 16px;
    font-size: 16px;
  `};
`;

export const RemoveButton = styled(Button)`
  height: 27px;
  font-size: 11px;
  line-height: 27px;
  padding: 0 18px;
  position: absolute;
  border-radius: 0 0 0 6px;
  right: 0;
  margin-top: -259px;

  ${media.greaterThan('medium')`
    margin-top: -30px;
    right: 60%;
  `}

  ${media.greaterThan('1280px')`
    margin-top: -40px;
  `}
`;

export const ScheduleButton = styled(Button)`
  width: 100%;
  margin-top: 7px;
  line-height: 35px;
  height: 35px;
  padding: 0 10px;

  ${media.greaterThan('medium')`
    width: auto;
  `}
`;

export const UndoButton = styled(Button)`
  width: 100%;
  line-height: 35px;
  height: 35px;

  ${media.greaterThan('medium')`
    padding: 0 40px;
    width: auto;
  `}
`;

export const MessageSuccess = styled.p`
  font: 18px 'Raleway';
  margin-bottom: 20px;

  ${media.greaterThan('medium')`
    font-size: 16px;
    margin-left: 67.5px;
    margin-right: 31.5px;
    margin-bottom: 0;
  `}
`;
