import styled from 'styled-components';
import media from 'styled-media-query';

export const DatasheetContent = styled.div`
  max-width: 1000px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.green};
  p {
    color: ${({ theme }) => theme.colors.white};
  }

  ${media.greaterThan('769px')`
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

  div {
    width: 150px;
    min-height: 45px;
  }

  ${media.greaterThan('769px')`
    border-bottom: none;
    border-right: 2px solid ${({ theme }) => theme.colors.greenBorder};
  `}
`;

export const BlockOne = styled(Block)`
  ${media.greaterThan('769px')`
    flex-direction: column;
    justify-content: ${props =>
      props.type !== 'pronto' ? 'flex-start' : 'space-around'} ;
    align-items: flex-start;
    flex-shrink: 0;
  `}

  ${props =>
    props.type !== 'pronto' &&
    media.greaterThan('769px')`
    width: 308px;
    flex-shrink: 0;
  `}
`;
export const BlockTwo = styled(Block)`
  ${media.greaterThan('769px')`
    width: 200px;
    flex-shrink: 0;
  `}
`;
export const BlockThree = styled(Block)`
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  height: 240px;

  div {
      flex-basis: 50%;
    }

  ${media.greaterThan('769px')`
    
  `}
`;

export const Type = styled.p`
  font: 18px 'BitterRegular';
`;

export const Neighborhood = styled.p`
  font: 15px 'RalewayRegular';
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const Ref = styled.p`
  font: 14px 'RalewayRegular';
`;

export const GroupButton = styled.div`
  button + button {
    margin-top: 10px;
  }
`;

export const Content = styled.p`
  font: 18px 'RalewayRegular';
`;

export const Price = styled.div`
  height: 82px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  p:nth-child(1) {
    font: 14px 'RalewayRegular';
  }
  p:nth-child(2) {
    font: 22px 'RalewaySemiBold';
  }
  p:nth-child(3) {
    font: 11px 'RalewayRegular';
  }
`;

export const InfoValue = styled.div`
  height: 82px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p:nth-child(1) {
    font: 18px 'RalewaySemiBold';
  }
  p:nth-child(2) {
    font: 18px 'RalewayRegular';
  }
`;

export const Delivery = styled.div`
  p {
    text-align: center;
    background-color: ${({ theme }) => theme.colors.greenLight};
    color: ${({ theme }) => theme.colors.white};
    font: 16px 'RalewayMedium';
    height: 35px;
    line-height: 35px;

    span {
      font: 16px 'RalewaySemiBold';
      color: ${({ theme }) => theme.colors.white};
    }
  }

  ${media.greaterThan('769px')`
    max-width: 1000px;
    margin: auto;

    p {
      width: 348px;
      margin-top: -35px;
    }
  `}
`;
