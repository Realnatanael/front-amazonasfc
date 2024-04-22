import { createGlobalStyle } from 'styled-components';

export const GlobalStyled = createGlobalStyle`
    *{
        margin: 0px;
        padding: 0px;
        font-family: Newsreader, Arial;
    }

    html{
        width: auto;
    }

    body{
        max-width: 100vw;
        height: 100vh;
        background-color: #171717;
    }
`
