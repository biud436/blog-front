import { Divider, Paper, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import Toc from 'react-toc';
import React from 'react';

export interface PostContentTocProps {
    content: string;
}

export const PostContentToc = observer(({ content }: PostContentTocProps) => {
    return (
        <div className="tocWrapper">
            <Paper sx={{ padding: 1, borderLeft: '3px solid #1976d2' }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    목차
                </Typography>
                <Divider />
                <Toc markdownText={content} className="toc" type="raw" />
            </Paper>
        </div>
    );
});
