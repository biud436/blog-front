'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

export const MyBlogContentContainer = observer(
  ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
    return (
      <Box
        sx={{
          width: '100%',
        }}
      >
        {children}
      </Box>
    );
  },
);
