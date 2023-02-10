import * as React from 'react';
import Typography from '@mui/material/Typography';
import { URL_MAP } from '@/common/URL';
import { Button, Box, Grid } from '@mui/material';
import { NextRouter } from 'next/router';
import GitHubIcon from '@mui/icons-material/GitHub';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import MetaCommonConfig from '@/blog/components/utils/meta-config.json';
import { WriteButton } from '../../../layouts/BlogMainLayout';
import styled from 'styled-components';
import Link from 'next/link';
import { GridLink } from '../common/GridLink';
import { HeaderIconButton } from './HeaderIconButton';
import { StatelessInput } from '../common/StatelessInput';
import { useStatelessInput } from '../../../hooks/useStatelessInput';

const HeaderStyleGuard = styled.div``;

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
                    p: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 5,
                    borderBottom: '1px solid #D8DEE4',
                    mb: 5,
                    mt: {
                        xs: 10,
                        sm: 10,
                        md: 10,
                        lg: 0,
                        xl: 0,
                    },
                }}
            >
                <Grid
                    item
                    flexGrow={0.1}
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'none',
                            md: 'flex',
                            lg: 'flex',
                            xl: 'flex',
                        },
                    }}
                >
                    <Typography
                        variant="h5"
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
                            alignItems: 'center',

                            borderLeft: '3px solid #1976d2',
                            pl: 1,
                        }}
                    >
                        {MetaCommonConfig.site_name}
                    </Typography>
                </Grid>
                {/* <Grid item>
                    <Grid
                        container
                        gap={2}
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
                        <GridLink href="/profile" text="About Me" />
                        <GridLink href="/career" text="Career" />
                    </Grid>
                </Grid> */}
                <Grid
                    item
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'none',
                            md: 'flex',
                            lg: 'flex',
                            xl: 'flex',
                        },
                    }}
                >
                    <Box>
                        <HeaderIconButton
                            startIcon={<GitHubIcon />}
                            href={MetaCommonConfig.github_url}
                        />
                        <HeaderIconButton
                            startIcon={<RssFeedIcon />}
                            href="/rss"
                        />
                        <WriteButton />
                    </Box>
                </Grid>
            </Grid>
        </HeaderStyleGuard>
    );
}
