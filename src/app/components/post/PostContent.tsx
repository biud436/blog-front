import { Post } from '@/store/post';
import { Grid } from '@mui/material';
import Markdown from 'marked-react';
import ReactRenderer from 'marked-react/dist/ReactRenderer';
import { ReactNode, useEffect, useRef } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Viewer } from '@toast-ui/react-editor';

import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import Prism from 'prismjs';
import 'prismjs/components/prism-clojure.js';
import 'prismjs/components/prism-typescript.js';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

type Optional<T> = {
    [P in keyof T]?: T[P];
};

const CodeRenderer: Optional<ReactRenderer> = {
    code(snippet: ReactNode, lang: string | undefined) {
        return (
            <SyntaxHighlighter key={this.elementId} language={lang}>
                {snippet}
            </SyntaxHighlighter>
        );
    },
};

const TuiEditorViewer = ({ content }: { content: string }) => {
    const viewerRef = useRef<Viewer>(null);

    return (
        <Viewer
            initialValue={content}
            plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        />
    );
};

export function PostContent({ post }: { post: Post }) {
    return (
        <Grid item xs={12}>
            <TuiEditorViewer content={post.content} />
        </Grid>
    );
}
