import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* End RESET */

  * {
    color: ${({ theme }) => theme.colors.greenDark};
    outline:none;
    box-shadow: none;
  }

  /* Fonts here */
  /* Fonts end here */

  html,
  body {
    width: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    transition: all 300ms ease;
    text-decoration: none;
  }

  p,
  li {
    line-height: 1.3em;
  }

  img {
    display: block;
    width: 100%;
  }

  input {
    outline: none;
  }

  button {
    background-color: transparent;
    border: 0;
    outline: none;
    cursor: pointer;
    border-radius: 0;
    -webkit-appearance: none;
  }

  button:focus {
    outline:none;
    box-shadow: none;
  }
`;
