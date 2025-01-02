'use client';

import * as React from 'react';
import { Box } from '@mui/material';

export const MyBlogContentContainer = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};
