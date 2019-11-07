import styled from 'styled-components';
import media from 'styled-media-query';
import Breadcrumb from 'components/Breadcrumb';

export const Icon = styled.img`
  ${props =>
    props.mq === 'mobile' &&
    media.greaterThan('medium')`
      display: none;
  `}

  ${props =>
    props.mq === 'desktop' &&
    media.lessThan('medium')`
      display: none;
  `}
`;

export const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 67px);
  position: fixed;
  left: 0;
  z-index: 110;
  overflow: hidden;
  height: 100vh;
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: 23px;
  right: 20px;
  width: 30px;
  height: 30px;

  img {
    width: 15px;
    height: 15px;
  }

  span {
    display: none;
  }

  ${media.greaterThan('medium')`
    display: block;
    background: none;
    font: 14px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
    margin: 75px 78px 20px auto;
    display: flex;
    align-items: center;
    width: auto;

    span {
      color: ${({ theme }) => theme.colors.white};
      text-transform: uppercase;
      display: block;
    }
  `}
`;

export const Header = styled(Breadcrumb)`
  position: absolute;
  width: 100vw;
  height: 67px;
  background-color: ${({ theme }) => theme.colors.white};
  top: 0;

  ${media.greaterThan('medium')`
    display: none;
  `}
`;
