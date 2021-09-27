import { css } from 'styled-components';
import media from 'styled-media-query';

const breakpoints = [ 'small', 'medium', 'large', 'huge' ];

const createTailwindClasses = () => {
  let classesCSS = '';

  for (let i = 0; i < breakpoints.length; i++) {
    const breakpoint = breakpoints[i];

    classesCSS += `
      ${media.greaterThan(breakpoint)`
        .${breakpoint}\\:hidden {
          display: none;
        }
        .${breakpoint}\\:block {
          display: block;
        }
        .${breakpoint}\\:flex {
          display: flex;
        }
      `}
    `;
  }

  return css`
    ${classesCSS.replace(/,/gi, '')}
  `;
};

export default css`
  .hidden {
    display: none;
  }

  .block {
    display: block;
  }

  .flex {
    display: flex;
  }

  ${createTailwindClasses()}
`;
