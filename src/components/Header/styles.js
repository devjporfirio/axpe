import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.header`
  width: 200px;
  height: 100vh;
  float: left;
  background-color: gray;

  h1 {
    font-family: 'RalewayLight';
  }

  ${media.lessThan('medium')`
    display: none;
  `}
`;
