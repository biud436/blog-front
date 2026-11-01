import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { SideMenu } from './SideMenu';
import { useMenuStore } from '@/store/menu';

interface MobileNavProps {
  categoryList: CategoryDepthVO[];
}

/** 오른쪽에서 열리는 카테고리/계정 메뉴 */
export const MobileNav = ({ categoryList }: MobileNavProps) => {
  const isOpen = useMenuStore(state => state.isOpen);
  const close = useMenuStore(state => state.close);

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={close}
      id="drawer-menu"
      PaperProps={{
        className: 'b-portal',
        sx: {
          width: 320,
          maxWidth: '88vw',
          color: 'var(--b-text)',
          backgroundColor: 'var(--b-surface)',
          borderLeft: '1px solid var(--b-border)',
          boxShadow: 'var(--b-shadow-lg)',
          '& .MuiListItemButton-root': {
            borderRadius: '10px',
            color: 'var(--b-text-2)',
            '&:hover': {
              color: 'var(--b-text)',
              backgroundColor: 'var(--b-subtle)',
            },
          },
          '& .MuiListItemIcon-root': { color: 'var(--b-text-3)', minWidth: 36 },
          '& .MuiListItemText-primary': {
            fontFamily: 'var(--b-font)',
            fontSize: '0.95rem',
          },
        },
      }}
      slotProps={{
        backdrop: { sx: { backgroundColor: 'rgba(10, 10, 12, 0.32)' } },
      }}
    >
      <SideMenu categoryList={categoryList} />
    </Drawer>
  );
};
