import styled from 'styled-components';
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

  ${media.greaterThan('medium')`
    border-bottom: none;
    border-right: 2px solid ${({ theme }) => theme.colors.greenBorder};
  `}
`;

export const BlockOne = styled(Block)`
  ${media.greaterThan('medium')`
    flex-direction: column;
    justify-content: ${props =>
      props.type !== 'pronto' ? 'flex-start' : 'space-around'} ;
    align-items: flex-start;
    flex-shrink: 0;
  `}

  ${props =>
    props.type !== 'pronto' &&
    media.greaterThan('medium')`
    width: 308px;
    flex-shrink: 0;
  `}
`;

export const BlockTwo = styled(Block)`
  ${media.greaterThan('medium')`
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

  ${media.greaterThan('medium')`
    border: none;
  `}
`;

export const Type = styled.p`
  font: 18px 'Bitter';
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  margin-bottom: 21px;
`;

export const Neighborhood = styled.p`
  font: 15px 'Raleway';
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const Ref = styled.p`
  font: 14px 'Raleway';

  ${media.greaterThan('medium')`
    font-size: 12px;
  `}
`;

export const GroupTags = styled.div`
  width: 144px;
  margin-top: 30px;

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
      width: 308px;
      margin-top: -35px;
    }
  `}
`;
