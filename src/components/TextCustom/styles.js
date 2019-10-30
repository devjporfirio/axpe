import styled from 'styled-components';

export const Container = styled.span`
  color: ${props => props.theme.colors[props.color]};
  font-family: ${props => props.fontFamily};
  font-weight: ${props => props.fontWeight ? props.fontWeight : 400};
`;
