import { createGlobalStyle } from "styled-components";
import variables from "./StyledVariables";
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

    body {
        font-family: var(--font-stack);
        font-size: 16px;
        background-color: var(--green-pale)
    }
    .container {
        padding: 0 2rem;
    }

    .main {
        min-height: 100vh;
        padding: 4rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
`;

export default GlobalStyle;
