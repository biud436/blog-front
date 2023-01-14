import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/router';
import { URL_MAP } from '@/common/URL';
import { useCallback } from 'react';

export function ManageButton() {
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(URL_MAP.MANAGE);
    }, [router]);

    return (
        <ListItem key={'goToManagePage'} disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="관리자" />
            </ListItemButton>
        </ListItem>
    );
}
