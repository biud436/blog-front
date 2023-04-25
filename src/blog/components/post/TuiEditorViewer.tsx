/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@toast-ui/editor/dist/toastui-editor.css';

import { Viewer, ViewerProps } from '@toast-ui/react-editor';
// import Prism from 'prismjs';
import 'prismjs';
import 'prismjs/components/prism-clojure.js';
import 'prismjs/components/prism-typescript.js';

import 'prismjs/themes/prism.css';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/themes/prism-okaidia.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor/dist/toastui-editor.css';

import '@toast-ui/editor/dist/i18n/ko-kr';
import { ForwardedScrollProgressBar } from '../atomic/ScrollProgressBar';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useInView } from 'framer-motion';
import * as React from 'react';
import { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { TocWrapper } from './PostPresent';
import { Box } from '@mui/material';

declare var Prism: any;

const ViewerWrapper = styled.div`
    .post-heading {
        margin-top: 0rem;
        margin-bottom: 0rem;

        cursor: pointer;

        color: #000;
        font-weight: bold;
        font-size: 1.5rem;

        text-decoration: none;
        border-left: 4px solid #1976d2;
        margin: 14px 0;
        padding: 0 16px;
    }

    /* https://stackoverflow.com/a/24298427/15266929 */
    [id]::before {
        content: '';
        display: block;
        height: 75px;
        margin-top: -75px;
        visibility: hidden;
    }

    .in-view {
        color: red;
    }

    .toastui-editor-dark .toastui-editor-contents pre {
        background-color: #232428;

        code {
            color: #c1798b;
        }

        position: relative;
    }

    .toastui-editor-contents {
        font-size: 1.2rem;
        font: 100 1.2rem 'Noto Sans KR', sans-serif;

        blockquote {
            border-left: 4px solid #1976d2;
        }
    }

    .copy-code {
        position: absolute;
        display: inline-block;
        margin: 0 5px;
        padding: 0 5px;
        border-radius: 3px;
        cursor: pointer;
        color: #fff;
        right: 0;
        top: 5px;
        background-color: #484849;
        font-size: 0.8rem;
    }

    .copy-code:hover {
        background-color: #1976d2;
    }

    .copy-code::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        line-height: 2rem;
    }
`;

const ForcusToc = ({
    setActiveId,
}: {
    setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const isInView = useInView(ref, {});

    useEffect(() => {
        const items = Array.from<HTMLAnchorElement>(
            document.querySelectorAll('.toc a'),
        );

        if (ref.current?.parentElement) {
            const { parentElement } = ref.current;

            if (isInView) {
                const targets = items.filter(item =>
                    item.getAttribute('href')?.includes(`#${parentElement.id}`),
                );

                targets.forEach(target => {
                    // target.classList.add('active');

                    setActiveId(target.id);
                });
            }
        }
    }, [isInView]);

    return (
        <div ref={ref}>
            <div className={isInView ? 'in-view' : ''}></div>
        </div>
    );
};

const HeadingElementWrapper = () => {
    const [, setActiveId] = useState<string | null>(null);
    const [activeComponents, setActiveComponents] = React.useState<
        React.ReactNode[]
    >([]);

    useEffect(() => {
        const anchorItems = Array.from<HTMLAnchorElement>(
            document.querySelectorAll('.post-heading'),
        );

        anchorItems.forEach(item => {
            const portal = ReactDOM.createPortal(
                <ForcusToc setActiveId={setActiveId} />,
                item,
            );

            setActiveComponents(prev => [...prev, portal]);
        });
    }, []);

    return <>{activeComponents}</>;
};

const useCodeCopyInjector = () => {
    useEffect(() => {
        const preCode = Array.from<HTMLPreElement>(
            document.querySelectorAll('pre'),
        );

        preCode.forEach(item => {
            const copyCode = document.createElement('div');
            copyCode.classList.add('copy-code');
            copyCode.innerHTML = '복사';

            copyCode.addEventListener('click', () => {
                const textArea = document.createElement('textarea');
                copyCode.innerHTML = '';
                textArea.value = item.innerText;
                document.body.appendChild(textArea);
                textArea.select();

                // document.execCommand('copy');
                navigator.clipboard.writeText(item.innerText);

                document.body.removeChild(textArea);

                copyCode.innerHTML = '복사됨!';

                setTimeout(() => {
                    copyCode.innerHTML = '복사';
                }, 800);
            });

            item.appendChild(copyCode);
        });

        return () => {
            preCode.forEach(item => {
                item.remove();
            });
        };
    }, []);
};

const TuiEditorViewer = ({ content }: { content: string }) => {
    const isLoaded = useRef<boolean>(false);
    const viewerRef = useRef<Viewer | null>(null);

    const setViewerRef = useCallback(
        (node: Viewer) => {
            viewerRef.current = node;
        },
        [viewerRef],
    );

    const customRenderer = useMemo<ViewerProps['customHTMLRenderer']>(() => {
        return {
            heading(node: any, { entering }) {
                const tagName = 'h' + node.level;
                const text = node.firstChild.literal;

                // change anchor tag.
                if (entering) {
                    return [
                        {
                            type: 'openTag',
                            tagName,
                            attributes: {
                                id: `${text.replace(/ /g, '-')}`,
                            },
                        },
                        {
                            type: 'openTag',
                            tagName: 'a',
                            classNames: ['post-heading'],
                            attributes: {
                                href: `#${text.replace(/ /g, '-')}`,
                                title: '',
                            },
                        },
                        {
                            type: 'text',
                            content: '',
                        },
                    ];
                }

                return [
                    {
                        type: 'closeTag',
                        tagName: 'a',
                    },
                    {
                        type: 'closeTag',
                        tagName,
                    },
                ];
            },
        };
    }, []);

    useCodeCopyInjector();

    return (
        <ViewerWrapper>
            <ForwardedScrollProgressBar ref={viewerRef} />
            <Viewer
                initialValue={content}
                plugins={[
                    [
                        codeSyntaxHighlight,
                        {
                            highlighter: Prism,
                        },
                    ],
                ]}
                ref={setViewerRef}
                linkAttributes={{ target: '_blank', rel: 'noreferrer' }}
                customHTMLRenderer={customRenderer}
                onLoad={() => {
                    isLoaded.current = true;
                }}
                theme="dark"
            />
            <HeadingElementWrapper />
            {/* <CodeCopyInjector /> */}
            <Box className="fixed transition-opacity opacity-50 left-3/4 top-1/4 z-150 hover:opacity-95">
                <TocWrapper content={content} />
            </Box>
        </ViewerWrapper>
    );
};

export default TuiEditorViewer;
