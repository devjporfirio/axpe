import styled from 'styled-components';
import media from 'styled-media-query';
import Slider from '../Slider';

export const SliderNav2 = styled(Slider)`
  .slick-slide {
    opacity: 0.2;
  }

  .slick-center {
    opacity: 1;
  }
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: -47px;
  right: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 30px;
  height: 30px;

  img {
    width: 15px;
    height: 15px;
  }

  span {
    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase;
  }

  ${media.lessThan('medium')`
    span {
      display: none;
    }
  `}
`;

