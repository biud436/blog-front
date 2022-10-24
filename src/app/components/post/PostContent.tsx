import { Post } from '@/store/post';
import { Grid } from '@mui/material';
import Markdown from 'marked-react';
import ReactRenderer from 'marked-react/dist/ReactRenderer';
import { ReactNode } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

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

export function PostContent({ post }: { post: Post }) {
    return (
        <Grid item xs={12}>
            <Markdown value={post.content} renderer={CodeRenderer} />
        </Grid>
    );
}
