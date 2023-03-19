'use client';

import React from 'react';
import { Stack, Typography } from '@mui/material';

export default function CheckPlatform({ platform }: { platform: string }) {
    return (
        <Stack
            sx={{
                borderRadius: 5,
                background: theme => theme.palette.background.paper,
            }}
            padding={2}
            gap={1}
            mt={2}
        >
            <Typography variant="h6">Next 버전 : 13</Typography>
            <Typography variant="h6">플랫폼 : {platform}</Typography>
        </Stack>
    );
}
