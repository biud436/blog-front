import { Button, Grid, Input } from '@mui/material';
import React from 'react';

export function CategoryEditSection({
  categoryName,
  onChangeInput,
  setEditMode,
  handleSubmit,
}: {
  categoryName: string;
  onChangeInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
}) {
  return (
    <Grid
      item
      gap={2}
      xs={12}
      sx={{
        display: 'flex',

        justifyContent: 'space-between',
        p: 2,
      }}
    >
      <Input
        value={categoryName}
        onChange={onChangeInput}
        sx={{
          mr: 1,
        }}
      />

      <Grid container>
        <Button variant="text" onClick={() => setEditMode(false)}>
          취소
        </Button>
        <Button variant="text" onClick={handleSubmit}>
          확인
        </Button>
      </Grid>
    </Grid>
  );
}
