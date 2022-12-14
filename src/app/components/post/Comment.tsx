import { observer } from 'mobx-react-lite';
import { Children, createRef, useEffect, useRef, useState } from 'react';

const src = 'https://utteranc.es/client.js';
const repo = 'biud436/blog-front';
const COMMENTS_ID = 'comments-container';

type UtterancesAttributesType = {
    src: string;
    repo: string;
    'issue-term': string;
    label: string;
    theme: string;
    crossorigin: string;
    async: string;
};

/**
 * Utterances 댓글 컴포넌트
 *
 * https://github.com/utterance/utterances/issues/624
 */
export const GithubComment = observer(() => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!elementRef.current) {
            return;
        }

        const utterances: HTMLScriptElement = document.createElement('script');
        const attributes: UtterancesAttributesType = {
            src,
            repo,
            'issue-term': 'pathname',
            label: 'Comment',
            theme: `github-light`,
            crossorigin: 'anonymous',
            async: 'true',
        };

        Object.entries(attributes).forEach(([key, value]) => {
            utterances.setAttribute(key, value);
        });

        utterances.onload = ev => {
            const comments = document.getElementById(COMMENTS_ID);

            if (comments && comments.children[1]) {
                // @ts-ignore
                comments.children[1].style.display = 'none';
            }
        };

        utterances.async = true;

        elementRef.current?.appendChild(utterances);

        // return () => {
        //     elementRef.current?.removeChild(utterances);
        // };
    }, [elementRef]);

    return (
        <div
            id={COMMENTS_ID}
            ref={elementRef}
            style={{
                width: '100%',
                height: '100%',
                padding: '0 0 0 0',
                margin: '0 0 0 0',
            }}
        />
    );
});

export default GithubComment;
