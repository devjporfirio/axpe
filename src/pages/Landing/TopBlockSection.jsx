import React from 'react';
import PropTypes from 'prop-types';

import { TopBlock, TopBlockTitle, TopBlockDescription } from './styles';

function TopBlockSection({ topBlock }) {
  return (
    <TopBlock backgroundColor={topBlock?.backgroundColor}>
      <TopBlockTitle titleColor={topBlock?.titleColor}>
        {topBlock?.title}
      </TopBlockTitle>
      {topBlock?.description && (
        <TopBlockDescription descriptionColor={topBlock?.descriptionColor}>
          {topBlock.description}
        </TopBlockDescription>
      )}
    </TopBlock>
  );
}

TopBlockSection.propTypes = {
  topBlock: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    backgroundColor: PropTypes.string,
    titleColor: PropTypes.string,
    descriptionColor: PropTypes.string,
  }),
};

export default TopBlockSection;
