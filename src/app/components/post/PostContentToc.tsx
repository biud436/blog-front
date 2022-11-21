import { Paper, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import Toc from 'react-toc';
import styled from 'styled-components';
import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export interface PostContentTocProps {
    content: string;
}

const TocContainer = styled.div`
    position: fixed;
    padding: 1rem;

    .toc {
        margin: 0;
        padding: 0;

        li {
            list-style: none;
            color: #000;
            font-size: 0.8rem;
            text-decoration: none;

            a {
                color: #000;
                text-decoration: none;

                a.active {
                    font-weight: bold;
                }
            }
        }
    }
`;

export const PostContentToc = observer(({ content }: PostContentTocProps) => {
    const ref = useRef<any>(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (isInView) {
            console.log('inview');
        }
    }, [isInView]);

    return (
        <TocContainer>
            <Paper sx={{ padding: 1 }}>
                <Typography variant="h6">목차</Typography>
                <Toc markdownText={content} className="toc" />
            </Paper>
        </TocContainer>
    );
});
