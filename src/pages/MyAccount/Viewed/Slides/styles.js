import styled from 'styled-components';
import media from 'styled-media-query';

// components
import PanelBuildings from 'components/PanelBuildings';
import Slider from 'components/Slider';

export const Image = styled.img`
  display: block;
  height: 228px;
  border-radius: 6px 6px 0 0;
  object-fit: cover;

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

  ${media.greaterThan('medium')`
    width:208px;
    height: 206px;
    border-radius: 6px;
  `}
`;

export const Panel = styled(PanelBuildings)`
  h4 {
    color: ${({ theme }) => theme.colors.orange};
    text-align: left;
    font-size: 20px;
    margin: 40px 35px 20px 45px;
  }

  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.white};
    margin-top: 0px;
  `}
`;

export const Slide = styled(Slider)`
  padding: 0 40px;

  section {
    height: 169px;

    a {
      display: none;
    }
  }

  ${media.greaterThan('medium')`
    .slick-slide {
      padding: 0 15px;

      section {
        padding: 20px 0;
      }
    }
  `}
`;
