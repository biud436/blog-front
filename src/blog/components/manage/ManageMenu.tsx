import React from 'react';
import { Box, Drawer, List, SxProps, Theme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { BrandLogo } from './BrandLogo';
import { CategoryManageButton } from './category/CategoryManageButton';
import { HomeButton } from './HomeButton';

interface ManageMenuProps {
    isOpen: boolean;
    sx: SxProps<Theme> | undefined;
    variant: 'permanent' | 'persistent' | 'temporary' | undefined;
}

export const ManageMenu = observer(
    ({ isOpen, sx, variant }: ManageMenuProps) => {
        return (
            <Drawer
                variant={variant}
                anchor="left"
                transitionDuration={400}
                sx={sx}
                SlideProps={{
                    translate: 'yes',
                    appear: true,
                }}
                open={isOpen}
            >
                <Box
                    sx={{
                        borderRadius: '1rem',
                        p: 2,
                        m: 2,
                    }}
                >
                    <BrandLogo />
                </Box>
                <Box
                    sx={{
                        borderRadius: '1rem',
                        p: 2,
                        m: 2,
                        background: 'linear-gradient(to top, #000000, #434343)',
                    }}
                >
                    <List>
                        <HomeButton />
                        <CategoryManageButton />
                    </List>
                </Box>
            </Drawer>
        );
    },
);
