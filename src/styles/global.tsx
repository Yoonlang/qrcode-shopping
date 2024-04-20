import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    line-height: 1.6;
    height: 100%;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  * {
    box-sizing: border-box;
  }

`;

export default GlobalStyle;
