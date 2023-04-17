import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { EditPageProps } from './PostEditorContainer';

export function PostEditorPageHeader({ mode }: EditPageProps) {
    return (
        <Grid item xs={12}>
            <Typography variant="h5">
                <ChevronRight />
                블로그 포스트 {mode === 'edit' ? '수정' : '작성'}
            </Typography>
            <Divider />
        </Grid>
    );
}
