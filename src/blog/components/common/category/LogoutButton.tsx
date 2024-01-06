import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AuthContextType } from '@/blog/providers/auth/AuthContextType';
import LogoutIcon from '@mui/icons-material/Logout';

export function LogoutButton({ auth }: { auth: AuthContextType }) {
    return (
        <ListItem
            key={'logout'}
            disablePadding
            onClick={() =>
                auth.logout(() => {
                    location.reload();
                })
            }
        >
            <ListItemButton>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={'로그아웃'} />
            </ListItemButton>
        </ListItem>
    );
}
