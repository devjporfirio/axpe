const theme = {
  /* Variables */
  colors: {
    white: '#fff',
    greyLight: '#F5F5F0',
    black: '#000',
    orange: '#EE6900',
    green: '#3F5A5E',
    greenDark: '#37474F',
  },
  mq: {
    'mobile-small': '320px',
    'mobile-medium': '375px',
    'mobile-large': '414px',
    mobile: '639px',
    tablet: '768px',
    desktop: '1024px',
    'desktop-small': '1280px',
    'desktop-medium': '1440px',
    'desktop-big': '1680px',
    'desktop-large': '1920px'
  },

  /* Mixins */
  hide: `
    opacity: 0;
    visibility: hidden;
  `,
  show: `
    opacity: 1;
    visibility: visible;
  `,

  /* Functions */
  fontFace: (name, url) => `
    @font-face {
      font-family: ${name};
      src: url(${url}) format("truetype");
    }
  `
};

export default theme;
