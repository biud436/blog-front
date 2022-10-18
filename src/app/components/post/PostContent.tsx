import { Post } from '@/store/post';
import { Grid } from '@mui/material';
import Markdown from 'marked-react';

export function PostContent({ post }: { post: Post }) {
    return (
        <Grid item xs={12}>
            <Markdown>{post.content}</Markdown>
        </Grid>
    );
}
