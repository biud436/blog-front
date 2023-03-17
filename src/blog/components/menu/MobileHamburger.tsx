import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { URL_MAP } from '@/common/URL';
import { observer } from 'mobx-react-lite';
import { menuStore } from '@/store/';

import { WriteButton } from './WriteButton';
import { AppBar } from './AppBar';

export const MobileHamburger = observer(
    ({
        handleDrawerOpen,
        router,
        name,
    }: {
        handleDrawerOpen: (e: React.MouseEvent) => void;
        router;
        name: string;
    }) => {
        return (
            <AppBar
                position="fixed"
                open={menuStore.isOpen}
                sx={{
                    bgcolor: '#3c3c3c',
                }}
            >
                <Toolbar
                    sx={{
                        display: {
                            xs: 'flex',
                            sm: 'flex',
                            md: 'flex',
                            lg: 'none',
                            xl: 'none',
                        },
                    }}
                >
                    <IconButton
                        color="inherit"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            mr: 2,
                            ...(menuStore.isOpen && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => {
                            router.push(URL_MAP.MAIN);
                        }}
                    >
                        {name}
                    </Typography>
                    <WriteButton />
                </Toolbar>
            </AppBar>
        );
    },
);
