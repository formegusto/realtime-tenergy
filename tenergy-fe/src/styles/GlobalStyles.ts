import { createGlobalStyle } from "styled-components";
import { blue, other } from "./colors";

export const ResetStyle = createGlobalStyle`
    /* reset code */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,a, 
    abbr, acronym, address, big, cite, code,del, dfn, 
    em, img, ins, kbd, q, s, samp,small, strike, strong, 
    sub, sup, tt, var,b, u, i, center,dl, dt, dd, ol, ul, 
    li,fieldset, form, label, legend,table, caption, tbody, 
    tfoot, thead, tr, th, td,article, aside, canvas, details, 
    embed, figure, figcaption, footer, header, hgroup, menu, 
    nav, output, ruby, section, summary,time, mark, audio, video {
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
    blockquote:before, blockquote:after,q:before, q:after {	
        content: '';	
        content: none;
    }
    table {	
        border-collapse: collapse;	
        border-spacing: 0;
    }
    * {
        font-family: 'Spoqa Han Sans Neo', 'sans-serif' !important;
    }

    html {
        background-color: ${blue[100]};
    }

    body {
        width: 100vw;
        max-width: 500px;

        margin: 0 auto;
    }
`;

export const NavigateAnimation = createGlobalStyle`
    .transition-wrapper {
        position: relative;
        overflow: hidden;
        height: 100vh;
        width: 100vw;
        z-index: 225;
    }
    .right-enter {
        transform: translateX(100%);
    }
  
    .right-enter-active {
        transform: translateX(0);
        transition: transform 300ms ease-in-out;
    }
  
    .right-exit {
        transform: translateX(0);
    }
  
    .right-exit-active {
        transform: translateX(-100%);
        transition: transform 300ms ease-in-out;
    }

    .left-enter {
        transform: translateX(-100%);
    }
    
    .left-enter-active {
        transform: translateX(0);
        transition: transform 300ms ease-in-out;
    }
    
    .left-exit {
        transform: translateX(0);
    }
    
    .left-exit-active {
        transform: translateX(100%);
        transition: transform 300ms ease-in-out;
    }

    * {
        -ms-overflow-style: "none";
        scrollbar-width: none;
    }
    *::-webkit-scrollbar {
        display: "none";
    }

    .benefit {
        color: ${other["lightgreen"]}
    }

    .loss {
        color: ${other["lightred"]}
    }
`;
