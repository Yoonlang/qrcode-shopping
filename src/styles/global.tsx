import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    --color-primary: #323232;
    --color-black: #000000;
    --color-white: #ffffff;
    --color-red: #ff0000;
    --color-green: #42ff00;
    --color-blue: #3da3f5;
    --color-gray-10: #fafafa;
    --color-gray-20: #f5f5f5;
    --color-gray-30: #eeeeee;
    --color-gray-40: #e7e7e7;
    --color-gray-50: #3c3c4336;
    --color-gray-60: #00000040;
    --color-gray-70: #999999;
    --color-gray-80: #00000099; 
    
    --color-app-bar-primary: var(--color-primary);
    
    --color-badge-primary: var(--color-green);
    --color-badge-secondary: var(--color-gray-60);
    
    --color-button-primary: var(--color-gray-10);

    --color-counter-primary: var(--color-gray-40); 

    --color-divider-primary: var(--color-gray-30); 

    --color-h4-primary: var(--color-gray-70); 
    --color-h4-secondary: var(--color-blue); 

    --color-language-selector-primary: var(--color-black);

    --color-li-primary: var(--color-gray-40);
    --color-li-secondary: var(--color-gray-60);
    --color-li-tertiary: var(--color-gray-10);

    --color-text-field-primary: var(--color-gray-40);
    --color-text-field-error: var(--color-red);
    --color-text-field-disabled: var(--color-gray-10);
    --color-text-field-required: var(--color-blue);

    --color-input-label-primary: var(--color-gray-10);
    --color-input-label-secondary: var(--color-gray-80);

    --color-switch-primary: var(--color-primary);
    --color-switch-secondary: var(--color-gray-10);

    box-sizing: border-box;
  }

  html,
  body,
  body > main {
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
