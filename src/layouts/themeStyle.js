const theme = {
  /* Variables */
  colors: {
    white: '#fff',
    greyLight: '#F5F5F0',
    grey: '#CFD8DC',
    greyDark: '#979797',
    black: '#000',
    orange: '#EE6900',
    greenLight: '#39B999',
    green: '#3F5A5E',
    greenDark: '#37474F',
    greenBorder: '#374E52',
    greenLight2: '#89D4AA',
    blueLight: '#77D0DD',
    yellowLight: '#FFDBA8'
  },
  fonts: {
    Bitter: {
      italic: '400i',
      regular: 400,
      bold: 700
    },
    Raleway: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900
    }
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
