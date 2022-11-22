import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  .tocWrapper {
    position: fixed;
    padding: 1rem;    
    width: 15em;
  }

  .toc {
        margin: 0;
        padding: 0;

        * {
          &:hover {
                background: #d2d2d2;
                opacity: 0.8;
          }          
        }

        ul {
            list-style: none;
            margin: 0;
            padding-left: 0.8rem;
        }

        li {
            list-style: none;
            color: #000;
            font-size: 0.8rem;
            text-decoration: none;
            line-height: 1.5rem;

            a {
                color: #000;
                text-decoration: none;

                &.active {
                    font-weight: bold;
                    color: #323233;
                }

                &:before {
                    content: '-';
                    display: inline-block;
                    width: 0.5rem;
                    height: 0.5rem;
                    top: -3em;
                }
            }            
        }
    }  
`;
