import * as React from 'react';
import Typography from '@mui/material/Typography';
import { URL_MAP } from '@/common/URL';
import { Button, Box, Grid } from '@mui/material';
import { NextRouter } from 'next/router';
import GitHubIcon from '@mui/icons-material/GitHub';
import MetaCommonConfig from '@/app/components/utils/meta-config.json';
import { WriteButton } from '../../../layouts/PageWrapper';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderStyleGuard = styled.div``;

const Line = styled.div`
    width: 0%;
    border-bottom: 3px solid #1976d2;

    &:hover {
        @keyframes slidein {
            from {
                width: 0%;
            }

            to {
                width: 100%;
            }
        }

        animation: slidein 0.5s ease-in-out;
        width: 100%;
    }
`;

export function MyBlogHeader({ router }: { router: NextRouter }) {
    return (
        <HeaderStyleGuard>
            <Grid
                container
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    onClick={() => {
                        router.push(URL_MAP.MAIN);
                    }}
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 700,
                        letterSpacing: '.2rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'all .3s ease-in-out',
                        '&:hover': {
                            color: 'primary.main',
                            letterSpacing: '.4rem',
                            transform: 'scale(1.1)',
                        },
                        borderLeft: '3px solid #1976d2',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pl: 1,
                    }}
                >
                    {MetaCommonConfig.site_name}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        ml: {
                            xs: 0,
                            sm: 0,
                            md: 2,
                            lg: 2,
                            xl: 2,
                        },
                        alignItems: 'center',
                    }}
                >
                    <Link
                        href="/profile"
                        passHref
                        style={{ textDecoration: 'none' }}
                    >
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
                            소개
                        </Typography>
                    </Link>
                </Box>
                <Box>
                    <Button
                        startIcon={<GitHubIcon />}
                        LinkComponent="a"
                        href={MetaCommonConfig.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            color: 'text.secondary',
                        }}
                    />
                    <WriteButton />
                </Box>
            </Grid>
        </HeaderStyleGuard>
    );
}
