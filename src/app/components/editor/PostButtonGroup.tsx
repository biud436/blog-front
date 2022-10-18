import { Button, Grid } from '@mui/material';
import React from 'react';

export function PostButtonGroup({
    handleWrite,
    handleCancel,
}: {
    handleWrite: () => Promise<void>;
    handleCancel: () => void;
}) {
    return (
        <Grid item sx={{ display: 'flex', gap: 2 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    handleWrite();
                }}
            >
                작성
            </Button>
            <Button
                variant="contained"
                color="warning"
                onClick={() => handleCancel()}
            >
                취소
            </Button>
        </Grid>
    );
}
