import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const DatasheetContent = styled.div`
  max-width: 1000px;
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
    padding: 42px 36px;
    width: 100%;
    border-bottom: none;
    border-right: 1.18px solid ${({ theme }) => theme.colors.greenBorder};
  `}
`;

export const BlockOne = styled(Block)`
  hr {
    display: none;
  }

  ${media.greaterThan('medium')`
    flex-direction: column;
    max-width: 349px;
    justify-content: ${props =>
      props.type !== 'pronto' ? 'flex-start' : 'space-around'} ;
    align-items: flex-start;
    flex-shrink: 0;

    hr {
      display: block;
      width: 79px;
      margin: 0;
      border: 1.18px solid  ${({ theme }) => theme.colors.greenBorder};    
    }
  `}
`;

export const BlockTwo = styled(Block)`
  ${media.greaterThan('medium')`
  max-width: 264px;
    flex-shrink: 0;
  `}
`;

export const BlockThree = styled(Block)`
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 240px;

  div {
    flex-basis: 50%;
  }

  ${media.greaterThan('medium')`
    border: none;

    ${props =>
      props.type === 'pronto' &&
      css`
        padding: 20px;
      `}
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
    align-items: center;
    margin-top: -2px;
  `}
`;

export const Neighborhood = styled.p`
  font: 15px 'Raleway';
  text-transform: uppercase;
  margin-bottom: 5px;

  ${media.greaterThan('medium')`
    font-size: 16px;
    line-height: 33px;
    letter-spacing: 0.46px;
  `}
`;

export const CategoryRelease = styled.p`
  font: 16px/25px 'Raleway';
  letter-spacing: 0.69px;
  display: none;

  ${media.greaterThan('medium')`
    display: block;
    margin-top: -12px;
  `}
`;

export const Ref = styled.p`
  font: 14px 'Raleway';

  ${media.greaterThan('medium')`
    font-size: 12px;
    line-height: 33px;
    letter-spacing: 0.34px;
    margin-left: 18px;
  `}
`;

export const GroupTags = styled.div`
  width: 144px;
  margin-top: 27px;

  div + div {
    margin-top: 10px;
  }
`;

export const Content = styled.p`
  font: 18px 'Raleway';
`;

export const Price = styled.div`
  height: 82px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  p:nth-child(1) {
    font: 14px 'Raleway';
  }
  p:nth-child(2) {
    font: 22px 'Raleway';
    font-weight: 600;
  }
  p:nth-child(3),
  p:nth-child(4) {
    font: 11px 'Raleway';
  }
`;

export const PriceRelease = styled.div`
  height: 26px;
  flex-basis: 100% !important;

  p {
    font: 22px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  }

  ${media.greaterThan('medium')`
    p {
      font-size: 26px;
    }
  `}
`;

export const InfoValue = styled.div`
  height: 82px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p:nth-child(1) {
    font: 18px 'Raleway';
    font-weight: 600;
  }
  p:nth-child(2) {
    font: 18px 'Raleway';
  }
`;

export const Delivery = styled.div`
  p {
    text-align: center;
    background-color: ${({ theme }) => theme.colors.greenLight};
    color: ${({ theme }) => theme.colors.white};
    font: 16px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
    height: 35px;
    line-height: 35px;

    span {
      font: 16px 'Raleway';
      font-weight: 600;
      color: ${({ theme }) => theme.colors.white};
    }
  }

  ${media.greaterThan('medium')`
    max-width: 1000px;
    margin: auto;

    p {
      width: 100%;
      max-width: 349px;
      margin-top: -35px;
    }
  `}
`;
