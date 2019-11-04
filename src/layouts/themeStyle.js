const theme = {
  /* Variables */
  colors: {
    white: '#fff',
    greyLight: '#F5F5F0',
    greyLight2: '#ECEFF1',
    greyLight3: '#F5F3F0',
    grey: '#CFD8DC',
    greyDark: '#979797',
    black: '#000',
    orange: '#EE6900',
    greenLight: '#39B999',
    green: '#3F5A5E',
    green2: '#2CB743',
    greenDark: '#37474F',
    greenBorder: '#374E52',
    greenLight2: '#89D4AA',
    blueLight: '#77D0DD',
    yellowLight: '#FFDBA8'
  },

  fontsWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900
  },

  /* Mixins */
  hide: `
    opacity: 0;
    visibility: hidden;
  `,
  show: `
    opacity: 1 !important;
    visibility: visible !important;
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
