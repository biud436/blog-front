import { Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ManageIntroduce from './atomic/ManageIntroduce.mdx';

export const ManagePresent = observer(() => {
    return (
        <Grid container spacing={0} direction="column">
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <ManageIntroduce />
            </Grid>
        </Grid>
    );
});
