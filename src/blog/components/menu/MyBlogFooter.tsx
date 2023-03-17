import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Button, Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import NextLink from 'next/link';
import MetaCommonConfig from '@/blog/components/utils/meta-config.json';

export const MyBlogFooter = observer(() => (
    <Grid container spacing={2} sx={{}}>
        <Grid item xs={12}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1rem',
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    © 2023
                </Typography>
                <Button
                    variant="text"
                    color="primary"
                    href={MetaCommonConfig.github_url}
                    LinkComponent={NextLink}
                    target="_blank"
                >
                    어진석
                </Button>
            </Box>
        </Grid>
    </Grid>
));
