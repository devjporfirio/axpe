import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.main`
  height: 100vh;
  overflow-y: scroll;
`;

export const Banner = styled.img`
  ${props =>
    props.mq === 'mobile'
      ? media.greaterThan('769px')`
        display: none !important;
      `
      : media.lessThan('medium')`
        display: none !important;
      `}
`;
