import { Divider, Drawer, List } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { drawerWidth } from '../../../../layouts/ManageLayout';
import { BrandLogo } from './BrandLogo';
import { CategoryManageButton } from './CategoryManageButton';
import { HomeButton } from './HomeButton';

export const RightManageMenu = observer(() => {
    return (
        <Drawer
            variant="permanent"
            anchor="right"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
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
