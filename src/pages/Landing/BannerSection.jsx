import React from 'react';
import PropTypes from 'prop-types';

import { Banner, Image } from './styles';

function BannerSection({ imagesBanner }) {
  if (!imagesBanner || Object.keys(imagesBanner).length === 0) return null;
  if (!imagesBanner.desktop || !imagesBanner.mobile) return null;

  return (
    <Banner
      href={imagesBanner.link.url}
      target={
        imagesBanner.link.external || imagesBanner.link.target !== 'self'
          ? '_blank'
          : '_self'
      }
    >
      <Image mq="desktop" src={imagesBanner.desktop} />
      <Image mq="mobile" src={imagesBanner.mobile} />
    </Banner>
  );
}

BannerSection.propTypes = {
  imagesBanner: PropTypes.shape({
    desktop: PropTypes.string,
    mobile: PropTypes.string,
    link: PropTypes.shape({
      url: PropTypes.string,
      external: PropTypes.bool,
      target: PropTypes.string,
    }),
  }),
};

export default BannerSection;
