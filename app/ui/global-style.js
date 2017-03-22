import { injectGlobal } from 'styled-components';
import theme from 'ui/theme';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  body {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    padding-top: ${theme.navHeight};
  }
  
  a:active, a:hover, a:focus {
    outline: 0;
  }

  #app {
    height: 100%;
  }
`;
