import React from 'react';
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router';
import { URL_MAP } from '@/common/URL';
import { DynamicMuiIcon } from '../common/DynamicIcon';

export const HomeButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push(URL_MAP.MAIN);
    };

    return (
        <ListItem key="home" disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <DynamicMuiIcon name="Cottage" />
                </ListItemIcon>
                <ListItemText primary="메인 화면으로" />
            </ListItemButton>
        </ListItem>
    );
};
