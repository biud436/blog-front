import React from 'react';
import { CircularProgress, Stack, Typography } from '@mui/material';

export function BlogLoading(): React.JSX.Element {
    return (
        <Stack
            direction={'column'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress />
            <Typography variant="h6">Loading...</Typography>
        </Stack>
    );
}
