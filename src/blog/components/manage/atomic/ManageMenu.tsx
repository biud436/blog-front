import { Divider, Drawer, List, SxProps, Theme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { drawerWidth } from '../../../../layouts/ManageLayout';
import { BrandLogo } from './BrandLogo';
import { CategoryManageButton } from '../category/CategoryManageButton';
import { HomeButton } from './HomeButton';

export const ManageMenu = observer(
    ({
        isOpen,
        sx,
        variant,
    }: {
        isOpen: boolean;
        sx: SxProps<Theme> | undefined;
        variant: 'permanent' | 'persistent' | 'temporary' | undefined;
    }) => {
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
                <BrandLogo />
                <Divider />
                <List>
                    <HomeButton />
                    <CategoryManageButton />
                </List>
            </Drawer>
        );
    },
);
