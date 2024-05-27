import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
  }

  html,
  body,
  body > main,
  body > main > div {
    padding: 0;
    margin: 0;
    line-height: 1.6;
    height: 100%;
  }

  body > main,
  body > main > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }


  body > .MuiMenu-root ul {
      padding: 0;
  }
`;

export default GlobalStyle;
