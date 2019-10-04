import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  background-color: #f5f5f0;

  header {
    display: flex;
    align-items: center;
  }

  &.buildingsSeen,
  &.buildingsForYou {
    margin-top: 20px;
    padding: 40px;
  }
`;

export const Title = styled.h4`
  color: ${({ theme }) => theme.colors.green};
  font-size: 41px/40px 'BitterBold';
  line-height: 40px;
  margin: 20px 0;
`;

export const SubTitle = styled.p`
  padding-left: 23px;
  margin-left: 23px;
  width: 220px;
  font: 16px/19px 'RalewayLight';
  border-left: 2px solid ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.green};
`;
