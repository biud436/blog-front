import * as React from 'react';
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@mui/icons-material/Search';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { LoginGuard } from './LoginGuard';
import { useAuthorized } from '@/hooks/server/useAuthorized';
import { useMenuStore } from '@/store/menu';
import { useCategoryStore } from '@/store/category';
import { usePaletteStore } from '@/store/palette';
import { useBlogNavigation } from '@/hooks/blog/useBlogNavigation';
import { SiteLogo } from '@/components/blog/BlogHeader';
import { hueStyle, splitCategoryName } from '@/components/blog/utils';

interface SideMenuProps {
  categoryList: CategoryDepthVO[];
}

export function SideMenu({ categoryList }: SideMenuProps) {
  const { isAuthorized } = useAuthorized();
  const close = useMenuStore(state => state.close);
  const openPalette = usePaletteStore(state => state.open);
  const currentId = useCategoryStore(state => state.currentMenuCategoryId);
  const { selectCategory } = useBlogNavigation();
  const rootId = categoryList[0]?.id;

  const renderTree = (list: CategoryDepthVO[]) => (
    <ul className="b-tree">
      {list.map(category => {
        const { label, count } = splitCategoryName(category.name);
        const isRoot = category.id === rootId;
        const isActive = isRoot ? !currentId : currentId === category.id;

        return (
          <li key={category.id}>
            <button
              type="button"
              className={`b-tree__btn ${isActive ? 'b-tree__btn--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => {
                selectCategory(category);
                close();
              }}
            >
              <span className="b-tree__dot" style={hueStyle(label)} />
              <span className="b-tree__name">{isRoot ? '전체' : label}</span>
              {count !== undefined && (
                <span className="b-tree__count">{count}</span>
              )}
            </button>
            {category.children?.length > 0 && renderTree(category.children)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="b-drawer">
      <div className="b-drawer__head">
        <SiteLogo onClick={close} />
        <button
          type="button"
          className="b-icon-btn"
          aria-label="메뉴 닫기"
          onClick={close}
        >
          <CloseIcon />
        </button>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        <button
          type="button"
          className="b-search-btn"
          style={{ width: '100%', margin: 0 }}
          onClick={() => {
            close();
            openPalette();
          }}
        >
          <SearchIcon fontSize="small" />
          <span>검색</span>
        </button>
      </div>

      <div className="b-drawer__label">카테고리</div>
      <nav aria-label="카테고리">{renderTree(categoryList)}</nav>

      <div className="b-drawer__account">
        <List component="div" disablePadding>
          <LoginGuard isAuthorized={isAuthorized} />
        </List>
      </div>
    </div>
  );
}
