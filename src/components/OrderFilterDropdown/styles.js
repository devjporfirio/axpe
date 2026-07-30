import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import ArrowIconSVG from 'assets/icons/arrow.svg';

export const FilterGroup = styled.div`
  position: relative;
`;

export const HeaderOrderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font: 13px 'Raleway';
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  color: ${({ theme }) => theme.colors.green};
  text-align: center;
  border: 2px solid ${({ theme }) => theme.colors.green};
  border-radius: 4px;

  span {
    margin-left: 10px;
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }

  &:after {
    content: '';
    display: block;
    width: 13px;
    height: 13px;
    margin-left: 10px;
    background: url(${ArrowIconSVG}) no-repeat;
    background-size: contain;
    transform: rotate(90deg);
    transition: all 300ms ease;
  }

  ${media.lessThan('medium')`
    display: none;
  `}

  ${media.greaterThan('medium')`
    padding: 0 15px;
    border: 0;
    height: auto;
    line-height: 15px;
  `}

  ${media.greaterThan('large')`
    ${(props) =>
      props.active &&
      css`
        &:after {
          transform: rotate(270deg);
        }
      `}
  `}
`;

export const HeaderOrderList = styled.div`
  display: none;

  ${media.greaterThan('small')`
    display: block;
    position: absolute;
    top: 15px;
    right: 10px;
    padding: 10px 10px;
    border: 1px solid ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.white};
    border-radius: 6px;
    ${({ theme }) => theme.hide};
    transition: all 300ms ease;

    ${(props) =>
      props.active &&
      css`
        top: 20px;
        ${({ theme }) => theme.show};
      `}
  `}
`;

export const HeaderOrderListButton = styled.button`
  display: block;
  width: 100%;
  padding: 5px 5px 5px 0;
  text-align: left;
  font: ${({ theme }) => theme.fontsWeight.regular} 13px 'Raleway';
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.green};
  font-weight: 700;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.greyLight};
  }

  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.colors.orange};
  }
`;
