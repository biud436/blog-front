import { Button, Grid } from '@mui/material';

export function BackButton({ goBack }: { goBack: () => void }) {
    return (
        <Grid container spacing={0} direction="row" alignItems="center">
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => goBack()}
                >
                    이전
                </Button>
            </Grid>
        </Grid>
    );
}
