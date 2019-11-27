import styled, { css } from 'styled-components';
import media from 'styled-media-query';

// components
import Button from 'components/Button';

export const Container = styled.div`
  min-height: 64px;

  h2 {
    font: 18px/28px 'Bitter';
    color: ${({ theme }) => theme.colors.orange};
    font-weight: ${({ theme }) => theme.fontsWeight.regular};

    &:first-letter {
      text-transform: uppercase;
    }
  }

  h3 {
    font: 14px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }

  ${media.greaterThan('medium')`
    h3 {
      margin-left: 30px;
    }
  `}

  ${props =>
    (props.type === 'building' || props.type === 'modal') &&
    ContainerBuildingPage}

  ${props => props.type === 'building' && ContainerBuilding}
  ${props => props.type === 'modal' && ContainerModal}
`;

export const ContainerBuildingPage = css`
  h2 {
    color: ${({ theme }) => theme.colors.green};
  }

  h3 {
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.orange};
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
`;

export const ContainerBuilding = css`
  ${media.greaterThan('medium')`
    & > div {
      padding: 15px;

      & > button {
        display: flex;
        align-items: center;
        width: auto;
        position: relative;
        top: 0;
        left: 0;
        margin-right: 20px;
        font: 14px 'Raleway';
        text-transform: uppercase;
        letter-spacing: 1px;
        color: ${({ theme }) => theme.colors.orange};
        font-weight: ${({ theme }) => theme.fontsWeight.semiBold};

        svg {
          margin-right: 5px;
          width: 14px;
          height: 14px;

          rect {
            fill: ${({ theme }) => theme.colors.orange};
          }
        }
      }
    }

  `}
`;

export const ContainerModal = css`
  & > div {
    top: 0;
  }

  ${media.greaterThan('medium')`
    display: none;
  `}
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  min-height: 46px;
  padding: 10px 30px 10px 60px;
  background: ${({ theme }) => theme.colors.white};
  z-index: 10;
  transition: all 50ms ease;

  ${media.greaterThan('medium')`
    top: 0;
    left: 200px;
    width: calc(100% - 200px);
    padding: 15px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`;

export const Column = styled.div`
  position: absolute;
  bottom: 10px;
  right: 30px;

  ${media.greaterThan('medium')`
    position: relative;
    bottom: auto;
    right: auto;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `}
`;

export const ButtonBack = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: 20px;
  width: 24px;
  height: 24px;
  font-size: 0;

  svg {
    display: block;
    width: 24px;
    height: 24px;
    transform: rotate(180deg);
  }

  ${media.greaterThan('medium')`
    display: none;
  `}
`;

export const ButtonIcon = styled.button`
  svg {
    display: block;

    path {
      transition: all 300ms ease;
    }
  }

  &:nth-child(1) {
    svg {
      width: 22px;
      height: 22px;

      path {
        fill: ${({ theme }) => theme.colors.green};
      }
    }

    ${media.greaterThan('1024px')`
      &:hover {
       svg path {
        fill: ${({ theme }) => theme.colors.orange};
       }
      }
    `}
  }

  &:nth-child(2) {
    margin-left: 15px;

    svg {
      width: 20px;
      height: 24px;
    }

    ${media.greaterThan('1024px')`
      &:hover {
        svg path {
          stroke: ${({ theme }) => theme.colors.orange};
        }
      }
    `}
  }
`;

export const ButtonContact = styled(Button)`
  margin-left: 20px;

  ${media.lessThan('767px')`
    display: none;
  `}
`;

export const Text = styled.p`
  font: 14px/28px 'Raleway';

  ${media.lessThan('767px')`
    display: none;
  `}
`;

export const ButtonLike = styled.button`
  display: flex;
  align-items: center;
  font: 14px 'Raleway';
  transition: all 300ms ease;

  svg {
    display: block;
    margin-left: 5px;
    width: 18px;
    height: 16px;

    path {
      transition: all 300ms ease;
    }
  }

  ${media.lessThan('767px')`
    font-size: 0;

    svg {
      margin-left: 0;
    }
  `}

  ${media.greaterThan('medium')`
    margin-left: 20px;
  `}

  ${media.greaterThan('1024px')`
    &:hover {
      color: ${({ theme }) => theme.colors.orange};

      svg path {
        stroke: ${({ theme }) => theme.colors.orange};
      }
    }
  `}
`;

export const ButtonMoreInformation = styled(Button)`
  ${media.lessThan('767px')`
    display: none;
  `}

  ${media.greaterThan('medium')`
    margin-left: 20px;
  `}
`;

export const PhoneContact = styled.p`
  font: 15px 'Raleway';
  color: ${({ theme }) => theme.colors.orange};
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};

  ${media.lessThan('767px')`
    display: none;
  `}

  ${media.greaterThan('medium')`
    margin-left: 10px;
  `}
`;
