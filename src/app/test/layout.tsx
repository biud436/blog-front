'use client';
import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

export default function TestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Stack
            sx={{
                alignItems: 'center',
                backgroundColor: grey[200],
                borderRadius: 1,
                p: 2,
            }}
            gap={2}
        >
            {children}
        </Stack>
    );
}
