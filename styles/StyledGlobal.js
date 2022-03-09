import { createGlobalStyle } from "styled-components";
import variables  from "./StyledVariables";
import { Fonts } from ".";

const GlobalStyle = createGlobalStyle`
    ${variables};
    ${Fonts};
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html {
        scroll-behavior: smooth;
    }
    
`;


export default GlobalStyle;