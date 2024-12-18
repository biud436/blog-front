'use client';

import React, { Suspense } from 'react';
import { CircularProgress, Stack } from '@mui/material';
import { EditorContainer } from '../../components/post/editor/EditorContainer';

export default function Editor() {
    return (
        <Suspense
            fallback={
                <Stack
                    direction={'column'}
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress />
                </Stack>
            }
        >
            <EditorContainer />
        </Suspense>
    );
}
