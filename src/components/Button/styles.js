import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.button`
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  width: 240px;
  height: 45px;
  border-radius: 4px;
  font-size: 15px;
  font-family: 'RalewaySemiBold';
  line-height: 45px;
  display: block;
  text-align: center;

  ${media.greaterThan('769px')` 
    width: 140px;
    height: 40px;
  `}
`;
