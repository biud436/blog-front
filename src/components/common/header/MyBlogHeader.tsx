import * as React from 'react';
import Typography from '@mui/material/Typography';
import { URL_MAP } from '@/common/URL';
import { Box, Button, Grid2 as Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import MetaCommonConfig from '@/components/common/utils/meta-config.json';
import { WriteButton } from '@/components/common/menu/WriteButton';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';

import { HeaderIconButton } from './HeaderIconButton';
import { useRouter } from 'next/navigation';
import { useMenuStore } from '@/store/menu';

const HeaderStyleGuard = styled.div``;

export function MyBlogHeader() {
  const router = useRouter();
  const menuStore = useMenuStore();

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
          borderBottom: '1px solid rgba(28, 25, 23, 0.08)',
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
              letterSpacing: '-0.01em',
              color: '#1c1917',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: '#c2410c',
              },
              alignItems: 'center',

              borderLeft: '2.5px solid #c2410c',
              pl: 1.5,
            }}
          >
            {MetaCommonConfig.site_name}
          </Typography>
        </Grid>
        <Grid
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
            <HeaderIconButton startIcon={<RssFeedIcon />} href="/rss" />
            <WriteButton />
          </Box>
        </Grid>
      </Grid>
    </HeaderStyleGuard>
  );
}
