import { Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

export const ManagePresent = observer(() => {
    return (
        <Grid container spacing={0} direction="column">
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h5">관리자 페이지 컨테이너</Typography>
            </Grid>
        </Grid>
    );
});
