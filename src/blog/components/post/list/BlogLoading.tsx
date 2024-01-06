import React from 'react';
import { CircularProgress, Stack, Typography } from '@mui/material';

export function BlogLoading(): React.JSX.Element {
    return (
        <Stack
            direction={'column'}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
            }}
        >
            <CircularProgress />
            <Typography variant="h6">Loading...</Typography>
        </Stack>
    );
}
