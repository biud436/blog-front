/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Searchable } from '@/models/Searchable';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { StoreApi, UseBoundStore } from 'zustand';
import { Paginable } from '@/models/Paginable';

/**
 *
 * @param useStore `Searchable<T>`인터페이스를 구현한 클래스의 인스턴스를 전달하세요.
 * @returns
 */
export function SearchBuilder<T extends string>(
  useStore: UseBoundStore<StoreApi<Searchable<T> & Paginable>>,
) {
  return observer(
    ({
      fetchDataBySearch,
    }: {
      fetchDataBySearch: (page?: number) => Promise<void>;
    }) => {
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
            item
            xs={2}
            sx={{
              width: '100%',
              '@media (max-width: 600px)': {
                display: 'none',
              },
            }}
          >
            <FormControl sx={{ m: 1, width: '100%' }}>
              <InputLabel id="search-option-label">검색 옵션</InputLabel>
              <Select
                labelId="search-option-label"
                id="search-option"
                value={store.getSearchType() ?? store.getDefaultCategory()!}
                label="검색 옵션"
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
          <Grid item xs={2} sx={{ width: '100%' }}>
            <FormControl sx={{ m: 1, width: '100%' }}>
              <TextField
                label="검색 내용"
                value={store.getSearchQuery() ?? ''}
                onChange={e => {
                  const { value } = e.target;

                  if (value === '') {
                    store.setSearchMode(false);
                  }

                  store.setSearchQuery(value);
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1} sx={{ width: '100%' }}>
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
    },
  );
}
