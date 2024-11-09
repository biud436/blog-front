import React from 'react';
import { observer } from 'mobx-react-lite';
import { SearchBox } from './PostsPresent';

interface SearchComponentProps {
  fetchDataBySearch: (page?: number) => Promise<void>;
}

export const SearchComponent = observer(
  ({ fetchDataBySearch }: SearchComponentProps) => {
    return <SearchBox fetchDataBySearch={fetchDataBySearch} />;
  },
);
