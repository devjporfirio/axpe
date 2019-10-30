import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.main`
  width: 100%;
  padding-top: 70px;

  ${media.greaterThan('medium')`
    width: calc(100% - 200px);
    margin-left: 200px;
    padding-top: 0;
  `}
`;