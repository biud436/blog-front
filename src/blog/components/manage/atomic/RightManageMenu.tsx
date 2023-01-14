import { Divider, Drawer, List } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { drawerWidth } from '../../../../layouts/ManageLayout';
import { BrandLogo } from './BrandLogo';
import { CategoryManageButton } from '../category/CategoryManageButton';
import { HomeButton } from './HomeButton';

export const RightManageMenu = observer(() => {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: {
                    xs: 0,
                    sm: 0,
                    md: drawerWidth,
                    lg: drawerWidth,
                    xl: drawerWidth,
                },
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: {
                        xs: 0,
                        sm: 0,
                        md: drawerWidth,
                        lg: drawerWidth,
                        xl: drawerWidth,
                    },
                    boxSizing: 'border-box',
                },
            }}
        >
            <BrandLogo />
            <Divider />
            <List>
                <HomeButton />
                <CategoryManageButton />
            </List>
        </Drawer>
    );
});
