import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import ManageIntroduce from './ManageIntroduce.mdx';

export const ManagePresent = () => {
  return (
    <Grid container spacing={0} direction="column">
      <Grid>
        <ManageIntroduce />
      </Grid>
    </Grid>
  );
};
