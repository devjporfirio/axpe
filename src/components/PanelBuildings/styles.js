import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
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
  font: 41px/40px 'Bitter';
  font-weight: 700;
  line-height: 40px;
  margin: 20px 0;
`;

export const SubTitle = styled.p`
  padding-left: 23px;
  margin-left: 23px;
  width: 220px;
  font: 16px/19px 'Raleway';
  font-weight: 300;
  border-left: 2px solid ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.green};
`;
