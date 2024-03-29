import React from 'react';
import { observer } from 'mobx-react-lite';
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router';
import { URL_MAP } from '@/common/URL';
import Category from '@mui/icons-material/Category';

export const CategoryManageButton = observer(() => {
    const router = useRouter();

    const handleClick = () => {
        router.push(URL_MAP.ADMIN_CATEGORY);
    };

    return (
        <ListItem key="home" disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <Category />
                </ListItemIcon>
                <ListItemText primary="카테고리 관리" />
            </ListItemButton>
        </ListItem>
    );
});
