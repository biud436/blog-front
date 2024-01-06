import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

export function LoginButton() {
    const router = useRouter();

    return (
        <ListItem
            key={'login'}
            disablePadding
            onClick={() => {
                router.push('/auth');
            }}
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
