import styled from 'styled-components';

export const Button = styled.button`
  display: inline-block;
  position: absolute;
  bottom: 2px;
  right: 0;
  padding-left: 40px;
  font: 14px 'Raleway';
  line-height: 40px;
  text-transform: lowercase;
  text-decoration: underline;
  background: linear-gradient(
    to left,
    ${({ theme }) => theme.colors.green} 80%,
    transparent 100%
  );
  color: ${({ theme }) => theme.colors.white};
`;
