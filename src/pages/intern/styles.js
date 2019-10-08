import styled from 'styled-components';

export const Container = styled.main`
  height: 100vh;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.greyLight};
  border: 1px solid ${({ theme }) => theme.colors.greyDark};
`;

export const Datasheet = styled.div`
  max-width: 1000px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.green};
  p, span {
    color: ${({ theme }) => theme.colors.white};
  }
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
`;

export const BlockOne = styled(Block)``;
export const BlockTwo = styled(Block)``;
export const BlockThree = styled(Block)`
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: row wrap;
  flex: 1;
  height: 240px;
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

export const Content = styled.p`
  font: 18px 'RalewayRegular';
`;

export const Delivery = styled.p`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.greenLight};
  font: 16px 'RalewayMedium';
  height: 35px;
  line-height: 35px;

  span {
    font: 16px 'RalewaySemiBold';
  }
`;

export const GroupButton = styled.div`
  button + button {
    margin-top: 10px;
  }
`;

export const Alert = styled.p`
  max-width: 1000px;
  margin: auto;
  text-align: center;
  font: 10.6px 'BitterRegular';
  color: ${({ theme }) => theme.colors.greenDark};
  padding: 15px;
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
  p:nth-child(1) {
    font: 18px 'RalewaySemiBold';
  }
  p:nth-child(2) {
    font: 18px 'RalewayRegular';
  }
`;
