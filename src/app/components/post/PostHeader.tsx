import { Post } from '@/store/post';
import { Divider, Grid, Typography } from '@mui/material';

export function PostHeader({ post }: { post: Post }) {
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>
                    {post.title}
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                display="flex"
                justifyContent="flex-start"
                gap={3}
            >
                <Typography variant="subtitle2">
                    조회수{' '}
                    <Typography sx={{ color: 'GrayText' }}>
                        {post.viewCount?.count}
                    </Typography>
                </Typography>
                <Typography variant="subtitle2">
                    작성자{' '}
                    <Typography sx={{ color: 'GrayText' }}>
                        {post.user?.profile?.nickname}
                    </Typography>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
        </>
    );
}
