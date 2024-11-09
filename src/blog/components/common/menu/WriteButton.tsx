import React, { memo } from 'react';
import Typography from '@mui/material/Typography';
import { URL_MAP } from '@/common/URL';
import { Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { useRouter } from 'next/navigation';

export const WriteButton = memo(() => {
  const router = useRouter();

  return (
    <Button
      color="inherit"
      onClick={() => router.push(URL_MAP.POST_EDIT)}
      startIcon={<CreateIcon />}
    >
      <Typography
        variant="button"
        sx={{
          color: '#1e1e1e',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        글쓰기
      </Typography>
    </Button>
  );
});
WriteButton.displayName = 'WriteButton';
