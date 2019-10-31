import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.section``;

export const Banner = styled.a`
  cursor: pointer;
  
  img {
    margin-bottom: 10px;

    ${props =>
      props.mq === 'mobile' &&
      media.greaterThan('medium')`
      display: none !important;
    `}

    ${props =>
      props.mq === 'desktop' &&
      media.lessThan('medium')`
      display: none !important;
    `}
  }
`;