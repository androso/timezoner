import { createGlobalStyle } from "styled-components";
import { variablesCSS } from ".";
const GlobalStyle = createGlobalStyle`
    ${variablesCSS};

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
`;

export default GlobalStyle;