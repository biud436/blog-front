import '@toast-ui/editor/dist/toastui-editor.css';

import { Viewer, ViewerProps } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clojure.js';
import 'prismjs/components/prism-typescript.js';

import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { ForwardedScrollProgressBar } from '../atomic/ScrollProgressBar';
import { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useInView } from 'framer-motion';
import * as React from 'react';
import ReactDOM from 'react-dom';

const ViewerWrapper = styled.div`
    .post-heading {
        margin-top: 1rem;
        margin-bottom: 1rem;

        cursor: pointer;

        color: #000;
        font-weight: bold;
        font-size: 1.5rem;

        text-decoration: none;
    }

    .in-view {
        color: red;
    }
`;

const HeadingElementWrapper = React.forwardRef(
    (props, elementRef: React.ForwardedRef<HTMLHeadingElement>) => {
        const isInView = useInView(elementRef as React.RefObject<Element>);

        useEffect(() => {
            if (isInView) {
                console.log(elementRef);
            }
        }, [isInView]);

        return <></>;
    },
);

const TuiEditorViewer = ({ content }: { content: string }) => {
    const viewerRef = useRef<Viewer>(null);
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

    return (
        <ViewerWrapper>
            <ForwardedScrollProgressBar ref={viewerRef} />
            <Viewer
                initialValue={content}
                plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                ref={viewerRef}
                linkAttributes={{ target: '_blank', rel: 'noreferrer' }}
                customHTMLRenderer={customRenderer}
            />
        </ViewerWrapper>
    );
};

export default TuiEditorViewer;
