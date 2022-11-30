import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  /**
   * 스크롤을 부드럽게 설정
   */
  html {
    scroll-behavior: smooth;
    background: #f8f8f8;
  }

  * {
    font-family: 'Noto Sans KR', sans-serif;
  }

  /**
   * 목차 컨테이너
   */
  .tocWrapper {
    position: fixed;
    padding: 1rem;    
    width: 15em;
  }

  /**
   * 목차 리스트 아이템
   */
  .toc {
        margin: 0;
        padding: 0;

        * {
          transition: 0.125s all ease-in;

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

                    border-left: 0.25rem solid #323233;
                    padding-left: 0.5rem;

                    transition: 0.125s all ease-in;
                    transform: scale(1.05);
                }

                &:before {
                    content: '';
                    display: inline-block;
                    width: 0.5rem;
                    height: 0.5rem;
                    top: -3em;
                }
            }            
        }
    } 
    

    .utterances {
      max-width: 100%;
    }
`;
