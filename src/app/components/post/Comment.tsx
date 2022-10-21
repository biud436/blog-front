import { observer } from 'mobx-react-lite';
import { createRef, useEffect, useRef } from 'react';

const src = 'https://utteranc.es/client.js';
const repo = 'biud436/blog-front';

type UtterancesAttributesType = {
    src: string;
    repo: string;
    'issue-term': string;
    label: string;
    theme: string;
    crossorigin: string;
    async: string;
};

export const GithubComment = observer(() => {
    const elementRef = createRef<HTMLDivElement>();

    useEffect(() => {
        if (elementRef.current === null) return;

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

        elementRef.current.appendChild(utterances);
    }, []);

    return <div ref={elementRef} />;
});