import styled from 'styled-components';
import media from 'styled-media-query';

export const MainContainer = styled.section`
display: flex;
flex-direction: column;
font-family: 'Raleway';
max-width: 1280px;
margin: 0 auto;

  ${media.greaterThan('medium')`
    flex-direction: row;
    justify-content: center;
  `}
`;

export const DatasheetContent = styled.div`
  max-width: 974px;

  background-color: ${({ theme }) => theme.colors.greyLight};
  padding: 16px;
  p {
    color: ${({ theme }) => theme.colors.green};
  }

`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  margin-bottom: 20px;

  ${media.greaterThan('medium')`
    padding: 16px 20px;
    width: 100%;
    `}
`;

export const BlockOne = styled(Block)`
  hr {
    display: none;
  }

  ${media.greaterThan('medium')`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-shrink: 0;
  `}
`;

export const BlockTwo = styled(Block)`
  display: flex;
  gap: 12px;

  ${media.greaterThan('medium')`
    padding: 16px 20px;
    flex-shrink: 0;
    align-items: flex-start;

    p {
      font-size: 16px;
      line-height: 23.6px;
    }
  `}
`;

export const BlockThree = styled(Block)`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px 10px;
  
  div {
    flex-basis: 33%;

    &.price-wfull {
      flex-basis: 100%;
    }
  }

  ${media.greaterThan('medium')`
    align-content: start;
    border: none;
    padding: 16px 20px;
    flex-wrap: nowrap;
  `}
`;

export const BlockFour = styled(Block)`
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 240px;

  ${media.greaterThan('medium')`
    align-content: start;
    border: none;
    padding: 19px 26px;
  `}
`;

export const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  ${media.greaterThan('small')`
    flex-direction: row;
  `}
`;

export const InfoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Type = styled.p`
  font: 16px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  text-transform: uppercase;
`;

export const Location = styled.div`
  font: 14px 'Raleway';
  color: ${({ theme }) => theme.colors.green};
  text-decoration: underline;
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  padding: 8px;

  a {
    display: flex;
  }
  img {
    width: 18px;
    margin-right: 4px;
  }
`;


export const GroupNeigRef = styled.div`
  ${media.greaterThan('medium')`
    display: flex;
    align-items: start;
    margin-top: -2px;
  `}
`;

export const Neighborhood = styled.p`
  font-size: 28px;
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  text-transform: capitalize;
  margin-bottom: 5px;

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
  div + div {
    margin-top: 10px;
  }
`;

export const Content = styled.p`
  font-size: 16px;
  line-height: 23.6px;
  color: ${({ theme }) => theme.colors.green};
`;

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;

  &.price-wfull, &.price-expenses {
    margin-top: 20px;
  }

  div {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 12px;
    justify-content: space-between;

    p {
      &:nth-child(1) {
        font-size: 16px;
        font-weight: ${({ theme }) => theme.fontsWeight.bold};
      }

      &:nth-child(2) {
        font-size: 18px;
        line-height: 26px;
        font-weight: ${({ theme }) => theme.fontsWeight.bold};
      }
    }
  }
`;

export const PriceGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.green};

  ${media.greaterThan('medium')`
    padding: 20px;
    max-width: 291px;
    max-height: 326px;
    justify-content: start;
    margin: 16px 16px 0 0;
  `}
`;

export const PriceGroupMobile = styled(PriceGroup)`
display: flex;
  ${media.greaterThan('medium')`
    display: none;
  `}
`

export const PriceGroupDesktop = styled(PriceGroup)`
display: none;
  ${media.greaterThan('medium')`
    display: flex;
  `}
`
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
  right: 20px;

  ${media.greaterThan('medium')`
      left: unset;
      right: 20px;
    `}
`;

export const InfoValue = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 12px;

  p {
    font-size: 14px;
    &:nth-child(1) {
      font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
    }
  }

  ${media.greaterThan('medium')`
    height: auto;
    padding: 14px 0;
  `}
`;

export const Delivery = styled.div`
  p {
    text-align: center;
    background-color: ${({ theme }) => theme.colors.greenLight};
    color: ${({ theme }) => theme.colors.green};
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
    height: 35px;
    line-height: 35px;

    span {
      font-size: 16px;
      font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
      color: ${({ theme }) => theme.colors.green};
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

export const PriceExpenses = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    width: 100%;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.green};
    border-top: 1px solid ${({ theme }) => theme.colors.green};

    p {
      font-size: 12px;
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
      text-transform: uppercase;
      margin-top: 12px;
    }

    div {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;

      dt,
      dd {
        width: 50%;
        font-size: 16px;
      }
  
      dd {
        text-align: right;
      }
    }
`

export const ButtonVisit = styled.button`
font-size: 16px;
font-weight: ${({ theme }) => theme.fontsWeight.bold};
color: ${({ theme }) => theme.colors.white};
background-color: ${({ theme }) => theme.colors.orange};
border-radius: 4px;
width: 100%;
height: 46px;
margin-top: 20px;
padding: 10px;
`

export const ButtonMoreInfo = styled.button`
font-size: 16px;
font-weight: ${({ theme }) => theme.fontsWeight.bold};
color: ${({ theme }) => theme.colors.orange};
border: 1px solid ${({ theme }) => theme.colors.orange};
border-radius: 4px;
width: 100%;
height: 46px;
margin-top: 12px;
padding: 10px;

`