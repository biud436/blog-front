import React from 'react';
import { SearchBox } from './PostsPresent';

interface SearchComponentProps {
  fetchDataBySearch: (page?: number) => Promise<void>;
}

export const SearchComponent = ({
  fetchDataBySearch,
}: SearchComponentProps) => {
  return <SearchBox fetchDataBySearch={fetchDataBySearch} />;
};
