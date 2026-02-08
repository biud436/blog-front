/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Searchable } from '@/models/Searchable';
import {
  Button,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { StoreApi, UseBoundStore } from 'zustand';
import { Paginable } from '@/models/Paginable';

export interface SearchComponentProps {
  fetchDataBySearch: (page?: number) => Promise<void>;
}

/**
 * 검색 기능을 제공하는 컴포넌트를 생성합니다.
 *
 * @param useStore `Searchable<T>`인터페이스를 구현한 클래스의 인스턴스를 전달하세요.
 * @returns
 */
export function SearchBuilder<T extends string>(
  useStore: UseBoundStore<StoreApi<Searchable<T> & Paginable>>,
) {
  const SearchComponent = ({ fetchDataBySearch }: SearchComponentProps) => {
    const store = useStore();

    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        <Grid
          size={{
            xs: 2,
            md: 3,
          }}
          sx={{
            width: '100%',
            '@media (max-width: 600px)': {
              display: 'none',
            },
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <FormControl
            sx={{
              m: 1,
              width: '100%',
            }}
          >
            <InputLabel
              id="search-option-label"
              sx={{ fontSize: '0.875rem' }}
            >
              검색 옵션
            </InputLabel>
            <Select
              labelId="search-option-label"
              id="search-option"
              value={store.getSearchType() ?? store.getDefaultCategory()!}
              label="검색 옵션"
              size="small"
              sx={{ fontSize: '0.875rem' }}
              onChange={(e: SelectChangeEvent) => {
                store.setSearchType(e.target.value as any);
              }}
            >
              {Object.keys(store.getSearchCategories()!).map(e => {
                const items = store.getSearchCategories()!;
                return (
                  <MenuItem key={e} value={e}>
                    {items[e]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 2, md: 5 }} sx={{ width: '100%' }}>
          <FormControl sx={{ m: 1, width: '100%' }}>
            <TextField
              label="검색 내용"
              value={store.getSearchQuery() ?? ''}
              size="small"
              InputLabelProps={{
                sx: { fontSize: '0.875rem' },
              }}
              inputProps={{
                sx: { fontSize: '0.875rem' },
              }}
              onChange={e => {
                const { value } = e.target;

                if (value === '') {
                  store.setSearchMode(false);
                }

                store.setSearchQuery(value);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  fetchDataBySearch(1);
                }
              }}
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 1, md: 2 }} sx={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ alignSelf: 'center' }}
            onClick={() => {
              fetchDataBySearch(1);
            }}
          >
            검색
          </Button>
        </Grid>
      </Grid>
    );
  };

  SearchComponent.displayName = 'SearchComponent';
  return SearchComponent;
}
