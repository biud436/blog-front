import * as React from 'react';
import Typography from '@mui/material/Typography';
import { URL_MAP } from '@/common/URL';
import { Box, Button, Grid } from '@mui/material';
import { NextRouter } from 'next/router';
import GitHubIcon from '@mui/icons-material/GitHub';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import MetaCommonConfig from '@/blog/components/utils/meta-config.json';
import { WriteButton } from '@/blog/components/menu/WriteButton';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';

import { HeaderIconButton } from './HeaderIconButton';
import { menuStore } from '@/store';
import { useRouter } from 'next/navigation';

const HeaderStyleGuard = styled.div``;

export function MyBlogHeader() {
    const router = useRouter();

    return (
        <HeaderStyleGuard>
            <Grid
                container
                sx={{
                    p: {
                        xs: 0,
                        lg: 3,
                    },
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 5,
                    borderBottom: '1px solid #D8DEE4',
                    mb: 5,
                    mt: {
                        xs: 10,
                        sm: 10,
                        md: 0,
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
                        <Button
                            startIcon={<MenuIcon />}
                            variant="text"
                            disableRipple
                            sx={{
                                color: 'text.primary',
                            }}
                            onClick={() => {
                                menuStore.open();
                            }}
                        />
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
