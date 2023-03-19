import React from 'react';
import { Post } from '@/store/post';
import { Grid } from '@mui/material';

import dynamic from 'next/dynamic';

const Viewer = dynamic(
    async () => {
        const [mod] = await Promise.all([import('./TuiEditorViewer')]);

        return mod.default;
    },
    {
        ssr: false,
        loading: () => <div>로딩중....</div>,
    },
);

export function PostContent({ post }: { post: Post }) {
    return (
        <>
            <Grid item xs={12}>
                <Viewer content={post.content} />
            </Grid>
        </>
    );
}
