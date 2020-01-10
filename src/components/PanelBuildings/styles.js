import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  width: 100%;
  margin: auto;
  background-color: #f5f5f0;

  &.buildingsSeen,
  &.buildingsForYou {
    padding: 0 40px 40px 40px;
  }

  ${media.greaterThan('medium')`
    &.buildingsSeen,
    &.buildingsForYou {
      padding: 40px;
    }

    &.suggestion .slick-slider button:nth-child(3) {
      left: 975px;
    }
  `}

  ${props => props.isHome && ContainerIsHome}
  ${props => props.hasSubtitle && ContainerHasSubtitle}
`;

const ContainerIsHome = css`
  & > header {
    max-width: 954px;
    margin: auto;
  }
`;

const ContainerHasSubtitle = css`
  & > header > h4 {
    max-width: 450px;
    text-align: center;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* max-width: 957px; */
  /* margin: auto; */
`;

export const Title = styled.h4`
  width: 100%;
  margin: 30px 0;
  color: ${({ theme }) => theme.colors.green};
  font: 22px 'Bitter';
  font-weight: ${({ theme }) => theme.fontsWeight.bold};

  strong {
    color: ${({ theme }) => theme.colors.orange};
  }

  ${media.greaterThan('medium')`
    width: auto;
    font-size: 41px;
    line-height: 50px;
  `}
`;

export const SubTitle = styled.p`
  display: none;
  padding-left: 23px;
  margin-left: 23px;
  width: 220px;
  font: 16px/19px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.light};
  border-left: 2px solid ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.green};

  ${media.greaterThan('medium')`display: block`}
`;
