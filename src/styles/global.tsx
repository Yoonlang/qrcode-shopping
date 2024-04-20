import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
  }

  html,
  body,
  body > div {
    padding: 0;
    margin: 0;
    line-height: 1.6;
    height: 100%;
  }

  body > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
`;

export default GlobalStyle;
