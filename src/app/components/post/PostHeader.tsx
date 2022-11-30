import { DateUtil, Formatter } from '@/app/api/date';
import { Post } from '@/store/post';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';

export function PostHeader({ post }: { post: Post }) {
    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);

        toast.info('포스트 링크가 복사되었습니다.', {
            position: 'top-center',
        });
    };

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h3" sx={{ color: 'primary.main' }}>
                    {post.title}
                </Typography>
            </Grid>

            <Grid
                item
                xs={12}
                display="flex"
                justifyContent={{
                    xs: 'space-between',
                    sm: 'space-between',
                    md: 'space-between',
                    lg: 'flex-start',
                }}
                flexDirection={{
                    xs: 'column',
                    sm: 'column',
                    md: 'column',
                    lg: 'row',
                }}
                flexShrink={{
                    xs: 0,
                    sm: 0,
                    md: 0,
                    lg: 1,
                }}
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
                <Typography variant="subtitle2">
                    작성일{' '}
                    <Typography sx={{ color: 'GrayText' }}>
                        {DateUtil.ToDateStringBySeoul(
                            post?.uploadDate!,
                            Formatter.DATETIME,
                        )}
                    </Typography>
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}
            >
                <Button variant="outlined" onClick={copyLinkToClipboard}>
                    링크 복사
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
        </>
    );
}
