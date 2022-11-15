import { EditPageProps } from '@/app/pages/editor';
import { Button, Grid } from '@mui/material';
import React, { useMemo } from 'react';

export function PostButtonGroup({
    mode,
    handleWrite,
    handleCancel,
}: {
    mode: EditPageProps['mode'];
    handleWrite: () => Promise<void>;
    handleCancel: () => void;
}) {
    const submitButtonName = useMemo(() => {
        return mode === 'edit' ? '수정' : '작성';
    }, [mode]);

    return (
        <Grid item sx={{ display: 'flex', gap: 2 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    handleWrite();
                }}
            >
                {submitButtonName}
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
