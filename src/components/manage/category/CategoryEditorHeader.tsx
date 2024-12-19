import { Button, Grid2 as Grid, Typography } from '@mui/material';
import ReturnIcon from '@mui/icons-material/KeyboardBackspace';
import React from 'react';

export function CategoryEditorHeader({
  returnToManagePage,
}: {
  returnToManagePage: () => void;
}) {
  return (
    <Grid container spacing={0} marginBottom={2} gap={2}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4" component="h1">
          카테고리 관리
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Button
          variant="text"
          onClick={returnToManagePage}
          startIcon={<ReturnIcon />}
        >
          관리자 페이지 메인으로
        </Button>
      </Grid>
    </Grid>
  );
}
