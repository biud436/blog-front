import { Button, Grid2 as Grid, SxProps } from '@mui/material';
import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview';
import React from 'react';
import { CategoryModel } from './CategoryTypes';

const styleEx: SxProps = {
  display: 'flex',
  alignItems: 'center',
  mb: 1,
  background: 'rgba(0, 0, 0, 0.02)',
  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
};

export function DragPreview({
  monitorProps,
}: {
  monitorProps: DragLayerMonitorProps<CategoryModel>;
}) {
  return (
    <Grid container sx={styleEx}>
      <Button
        variant="text"
        sx={{
          color: 'text.secondary',
        }}
      >
        {monitorProps.item.text}
      </Button>
    </Grid>
  );
}
