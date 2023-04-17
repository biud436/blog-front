import React from 'react';
import { Grid, Alert } from '@mui/material';
import { EditPageProps } from './PostEditorContainer';

export function PostEditorPageDescription({ mode }: EditPageProps) {
    return (
        <Grid item xs={12}>
            <Grid container gap={4}>
                <Grid item xs={12}>
                    <Alert severity="info">
                        포스트를 {mode === 'edit' ? '수정' : '작성'}합니다.
                    </Alert>
                </Grid>
            </Grid>
        </Grid>
    );
}
