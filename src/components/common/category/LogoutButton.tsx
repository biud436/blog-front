import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogout } from '@/hooks/server/useLogout';

export function LogoutButton() {
  const { logout } = useLogout();

  return (
    <ListItem key={'logout'} disablePadding onClick={() => logout.mutate()}>
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={'로그아웃'} />
      </ListItemButton>
    </ListItem>
  );
}
