'use client';
import { Container, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

export default function TestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Container>
            <Stack
                sx={{
                    alignItems: 'center',
                    backgroundColor: grey[300],
                    borderRadius: 1,
                    height: '100vh',
                }}
            >
                레이아웃 테스트
                {children}
            </Stack>
        </Container>
    );
}
