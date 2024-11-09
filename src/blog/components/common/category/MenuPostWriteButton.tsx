import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavigateFunction } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import { URL_MAP } from '@/common/URL';

interface MenuPostWriteButtonProps {
  navigate: NavigateFunction;
}

export function MenuPostWriteButton({ navigate }: MenuPostWriteButtonProps) {
  return (
    <ListItem
      key={'post_write_editor'}
      disablePadding
      onClick={() => navigate(URL_MAP.POST_EDIT)}
    >
      <ListItemButton>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary={'글쓰기'} />
      </ListItemButton>
    </ListItem>
  );
}
