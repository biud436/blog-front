import {
    Container,
    createStyles,
    Divider,
    makeStyles,
    Paper,
    Theme,
    Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import Toc from 'react-toc';
import styled from 'styled-components';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import { useTocItems } from '@/hooks/useTocItems';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export interface PostContentTocProps {
    content: string;
}

export const PostContentToc = observer(({ content }: PostContentTocProps) => {
    const ref = useRef<any>(null);
    const isInView = useInView(ref);
    const [visiableEntries] = useIntersectionObserver();

    useEffect(() => {
        if (isInView) {
            console.log('inview');
        }
    }, [isInView, visiableEntries]);

    return (
        <Container className="tocWrapper">
            <Paper sx={{ padding: 1 }}>
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
        </Container>
    );
});
