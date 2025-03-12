import React from 'react';
import PropTypes from 'prop-types';
import { DotsContainer, DotItem, DotButton } from './styles';

const DotPagination = ({ currentSlide, slideCount, onDotClick }) => {
  const maxDots = 4;

  const windowStart = slideCount > maxDots
    ? Math.min(Math.max(0, currentSlide - 2), slideCount - maxDots)
    : 0;
    
  const windowDots = [];
  for (let i = windowStart; i < Math.min(windowStart + maxDots, slideCount); i++) {
    windowDots.push(i);
  }

  return (
    <DotsContainer>
      {windowDots.map((dotIndex, idx) => {
        let size = 16;
        if (dotIndex < currentSlide) {
          size = 8;
        }
        if (
          idx === windowDots.length - 1 &&
          slideCount > windowDots[windowDots.length - 1] + 1
        ) {
          size = 8;
        }
        if (dotIndex === currentSlide) {
          size = 16;
        }

        return (
          <DotItem key={`dot-${dotIndex}`}>
            <DotButton
              size={size}
              active={dotIndex === currentSlide}
              onClick={() => onDotClick(dotIndex)}
            />
          </DotItem>
        );
      })}
    </DotsContainer>
  );
};

DotPagination.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  slideCount: PropTypes.number.isRequired,
  onDotClick: PropTypes.func.isRequired,
};

export default DotPagination;

