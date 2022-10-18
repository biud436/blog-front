import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavigateFunction } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import { URL_MAP } from '@/common/URL';

export function LoginButton({ navigate }: { navigate: NavigateFunction }) {
    return (
        <ListItem
            key={'login'}
            disablePadding
            onClick={() => navigate(URL_MAP.LOGIN)}
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
