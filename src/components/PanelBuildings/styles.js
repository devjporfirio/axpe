import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  width: 100%;
  margin: auto;
  background-color: #f5f5f0;

  header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    max-width: 957px;
    margin: auto;
  }

  &.buildingsSeen,
  &.buildingsForYou {
    padding: 40px;
  }
`;

export const Title = styled.h4`
  color: ${({ theme }) => theme.colors.green};
  font: 22px 'Bitter';
  font-weight: ${({ theme }) => theme.fontsWeight.bold};
  margin: 20px 0;
  max-width: 450px;

  ${media.greaterThan('medium')`
    font-size: 41px;
    line-height: 40px;
  `}
`;

export const SubTitle = styled.p`
  padding-left: 23px;
  margin-left: 23px;
  width: 220px;
  font: 16px/19px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.light};
  border-left: 2px solid ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.green};
`;
