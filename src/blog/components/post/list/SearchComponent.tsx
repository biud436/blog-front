import React from 'react';
import { postsStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { SearchBox } from './PostsPresent';

export const SearchComponent = observer(
    ({
        fetchDataBySearch,
    }: {
        fetchDataBySearch: (page?: number) => Promise<void>;
    }) => {
        return (
            <SearchBox
                store={postsStore}
                fetchDataBySearch={fetchDataBySearch}
            />
        );
    },
);
