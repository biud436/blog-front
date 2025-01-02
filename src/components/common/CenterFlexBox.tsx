'use client';

import Box from '@mui/material/Box';
import React from 'react';

interface CenterFlexBoxProps {
  children: React.ReactNode[];
}

export const CenterFlexBox = ({ children }: CenterFlexBoxProps) => {
  return (
    <Box
      sx={{
        display: {
          xs: 'flex',
          sm: 'flex',
          md: 'flex',
        },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
};
