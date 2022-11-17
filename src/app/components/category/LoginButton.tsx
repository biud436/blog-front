import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavigateFunction } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import { URL_MAP } from '@/common/URL';
import { NextRouter } from 'next/router';

export function LoginButton({ router }: { router: NextRouter }) {
    return (
        <ListItem
            key={'login'}
            disablePadding
            onClick={() => router.push(URL_MAP.LOGIN)}
        >
            <ListItemButton>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={'로그인'} />
            </ListItemButton>
        </ListItem>
    );
}
