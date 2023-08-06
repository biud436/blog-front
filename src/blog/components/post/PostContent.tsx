import React from 'react';
import { Post } from '@/models/Post';
import { Grid } from '@mui/material';

import dynamic from 'next/dynamic';

const Viewer = dynamic(
    async () => {
        const [mod] = await Promise.all([import('../viewer/TuiEditorViewer')]);

        return mod.default;
    },
    {
        ssr: false,
        loading: () => <div className="p-4">로딩중...</div>,
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
