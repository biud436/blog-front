import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import ManageIntroduce from './ManageIntroduce.mdx';

export const ManagePresent = observer(() => {
  return (
    <Grid container spacing={0} direction="column">
      <Grid>
        <ManageIntroduce />
      </Grid>
    </Grid>
  );
});
