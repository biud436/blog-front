import React from 'react';
import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ManageIntroduce from './ManageIntroduce.mdx';

export const ManagePresent = observer(() => {
    return (
        <Grid container spacing={0} direction="column">
            <Grid item>
                <ManageIntroduce />
            </Grid>
        </Grid>
    );
});
