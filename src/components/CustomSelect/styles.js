import styled from 'styled-components';
import media from 'styled-media-query';
import ArrowIconSVG from 'assets/icons/arrow';

export const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 30%;
  
  ${media.greaterThan('medium')`
    display: none;
  `}
`;

export const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 38px;
  line-height: 50px;
  font: 14px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.bold};
  color: ${({ theme }) => theme.colors.green};
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.colors.green};
  background: transparent;
  cursor: pointer;
  padding: 10px 24px;
  
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
`;

export const OptionsList = styled.ul`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.white};
  list-style: none;
  margin-top: 2px;
  padding: 0;
  z-index: 10;
`;

export const OptionItem = styled.li`
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.green};
  cursor: pointer;
  
  &:hover {
    background: transparent; 
    color: ${({ theme }) => theme.colors.orange}; 
  }
`;