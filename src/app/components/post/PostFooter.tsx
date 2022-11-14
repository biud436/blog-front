import { Button, Grid } from '@mui/material';
import { useAuthorized } from '@/hooks/useAuthorized';

export function PostFooter({ goBack }: { goBack: () => void }) {
    const [isAuthorized] = useAuthorized();

    return (
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent={'space-between'}
        >
            <Grid item xs={8}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => goBack()}
                >
                    이전
                </Button>
            </Grid>
            {isAuthorized && (
                <Grid container spacing={0} xs={4}>
                    <Grid
                        item
                        xs={12}
                        gap={2}
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                        }}
                    >
                        <Button variant="outlined" color="warning">
                            수정
                        </Button>
                        <Button variant="outlined" color="error">
                            삭제
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}
