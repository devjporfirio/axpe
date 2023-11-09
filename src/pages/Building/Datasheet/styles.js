import styled from 'styled-components';
import media from 'styled-media-query';

export const DatasheetContent = styled.div`
  max-width: 974px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.green};
  p {
    color: ${({ theme }) => theme.colors.white};
  }

  ${media.greaterThan('medium')`
    display: flex;
    height: 268px;
  `}
`;

export const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.greenBorder};

  ${media.greaterThan('medium')`
    padding: 33px 38px;
    width: 100%;
    border-bottom: none;
    border-right: 1px solid ${({ theme }) => theme.colors.greenBorder};
  `}
`;

export const BlockOne = styled(Block)`
  hr {
    display: none;
  }

  ${media.greaterThan('medium')`
    flex-direction: column;
    max-width: 349px;
    justify-content: flex-start;
    align-items: flex-start;
    flex-shrink: 0;

    hr {
      display: block;
      width: 79px;
      margin: 0;
      border: 1px solid  ${({ theme }) => theme.colors.greenBorder};    
    }
  `}
`;

export const BlockTwo = styled(Block)`
  ${media.greaterThan('medium')`
    padding: 51px 27px 0 27px;
    max-width: 264px;
    flex-shrink: 0;
    align-items: flex-start;

    p {
      font-size: 16px;
      line-height: 23.6px;
    }
  `}
`;

export const BlockThree = styled(Block)`
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 240px;

  div {
    flex-basis: 50%;

    &.price-wfull {
      flex-basis: 100%;
    }
  }

  ${media.greaterThan('medium')`
    align-content: start;
    border: none;
    padding: 19px 26px;
  `}
`;

export const GroupInfo = styled.div`
  ${media.greaterThan('medium')`
    width: 100%;
  `}
`;

export const Type = styled.p`
  font: 18px 'Bitter';
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  margin-bottom: 21px;

  ${media.greaterThan('medium')`
    font-size: 28px;
    margin-bottom: 0;
  `}
`;

export const GroupNeigRef = styled.div`
  ${media.greaterThan('medium')`
    display: flex;
    align-items: start;
    margin-top: -2px;
  `}
`;

export const Neighborhood = styled.p`
  font-size: 15px;
  text-transform: uppercase;
  margin-bottom: 5px;

  ${media.greaterThan('medium')`
    font-size: 16px;
    line-height: 33px;
    letter-spacing: 0.5px;
    max-width: 50%;
  `}
`;

export const CategoryRelease = styled.p`
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.69px;
  display: none;

  ${media.greaterThan('medium')`
    display: block;
    margin-top: -12px;
  `}
`;

export const Ref = styled.p`
  font-size: 14px;
  white-space: nowrap;

  ${media.greaterThan('medium')`
    font-size: 16px;
    line-height: 23.6px;
    letter-spacing: 0.34px;
    margin-left: 18px;
    padding-top: 4px;
  `}
`;

export const GroupTags = styled.div`
  /*width: 144px;*/
  margin-top: 27px;

  div + div {
    margin-top: 10px;
  }
`;

export const Content = styled.h1`
  font-size: 16px;
  line-height: 23.6px;
  color: #fff;
`;

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  &.price-wfull {
    margin-top: 20px;
  }

  p {
    &:nth-child(1) {
      font-size: 14px;
    }

    &:nth-child(2) {
      font-size: 22px;
      line-height: 26px;
      font-weight: 600;

      ${media.lessThan('small')`
        font-size: 19px;
      `}
    }

    &:nth-child(3) {
      margin-top: 8px;

      ${media.greaterThan('medium')`
        margin-top: 12px;
        margin-bottom: 4px;
      `}
    }

    &:nth-child(3),
    &:nth-child(4) {
      font-size: 12px;
    }
  }
`;

export const PriceGroup = styled.div`
  width: 100%;
  flex-basis: 100% !important;
  display: flex;
  align-items: baseline;
`;

export const PriceRelease = styled.div`
  height: 26px;
  flex-basis: 100% !important;

  p {
    font-size: 22px;
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  }

  ${media.greaterThan('medium')`
    padding-top: 22px;
    padding-bottom: 29px;

    p {
      font-size: 24px;
    }
  `}
`;

export const BuildingLabel = styled.div`
  position: absolute;
  top: 0px;
  left: 20px;

  ${media.greaterThan('medium')`
      left: unset;
      right: 20px;
    `}
`;

export const InfoValue = styled.div`
  height: 82px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    &:nth-child(1) {
      font-size: 18px;
      font-weight: 600;
    }

    &:nth-child(2) {
      font-size: 18px;
    }
  }

  ${media.greaterThan('medium')`
    height: auto;
    padding: 14px 0;

    p {
      font-size: 16px !important;
      line-height: 18px !important;
    }
  `}
`;

export const Delivery = styled.div`
  p {
    text-align: center;
    background-color: ${({ theme }) => theme.colors.greenLight};
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
    height: 35px;
    line-height: 35px;

    span {
      font-size: 16px;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.white};
    }
  }

  ${media.greaterThan('medium')`
    max-width: 974px;
    margin: auto;

    p {
      width: 100%;
      max-width: 349px;
      margin-top: -35px;
    }
  `}
`;

export const NamesAndPrices = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 12px;
    width: 100%;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.white};

    dt,
    dd {
      width: 50%;
      margin-bottom: 8px;
    }

    dd {
      text-align: right;
    }
`