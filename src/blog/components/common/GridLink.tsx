import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

export interface GridLinkProps {
    href: string;
    text: string;
}

export function GridLink({ href, text }: GridLinkProps) {
    return (
        <Grid item>
            <Link href={href} passHref style={{ textDecoration: 'none' }}>
                <Typography
                    variant="h6"
                    sx={{
                        color: 'black',
                        cursor: 'pointer',
                        borderBottom: '2px solid gray',

                        '&:hover': {
                            letterSpacing: '.3rem',
                            transform: 'scale(1.1)',
                            borderBottom: '3px solid #1976d2',
                            pl: 1,
                            transition: 'all .3s ease-in-out',
                            userSelect: 'none',
                        },
                    }}
                >
                    {text}
                </Typography>
            </Link>
        </Grid>
    );
}
