import { Button, Grid2 as Grid } from '@mui/material';
import { NodeModel } from '@minoru/react-dnd-treeview';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { CategoryNodeEventHandler, CategoryModel } from './CategoryTypes';

export interface CategoryNodeHandlerProps {
  emitOnEdit: (nodeId: string | number) => void;
  node: NodeModel<CategoryModel>;
  onDelete: CategoryNodeEventHandler;
}

export function CategoryNodeHandler({
  emitOnEdit,
  node,
  onDelete,
}: CategoryNodeHandlerProps): React.ReactElement {
  return (
    <Grid
      size={{ xs: 1 }}
      justifyContent="flex-end"
      display="flex"
      alignItems="center"
    >
      <Button
        onClick={() => emitOnEdit(node.id)}
        sx={{
          color: 'text.secondary',
        }}
      >
        <ModeEditIcon />
      </Button>
      <Button
        onClick={() => onDelete(node.id)}
        sx={{
          color: 'text.secondary',
        }}
      >
        <DeleteIcon />
      </Button>
    </Grid>
  );
}
