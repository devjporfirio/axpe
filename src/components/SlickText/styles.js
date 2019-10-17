import styled from 'styled-components';
import media from 'styled-media-query';
import Slider from 'components/Slider';

export const Container = styled(Slider)`
  max-width: 1000px;
  margin: auto;

  img {
    height:376px;

    ${media.greaterThan('769px')`
      height: auto;
    `}
  }
`;
