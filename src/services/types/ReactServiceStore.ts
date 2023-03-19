/* eslint-disable @typescript-eslint/no-explicit-any */
import { Paginable } from '@/store/types/list';
import { Searchable } from '@/store/types/searchable';
import { ReactNode } from 'react';

export type ReactServiceStore<T> = Searchable<T> & Paginable;

export interface IReactService<T> {
    search(pageNumber: number, searchProperty: string, searchQuery: string);
    view(pageNumber: number);
    fetch(
        store: ReactServiceStore<T>,
        categoryId?: number | undefined | null,
    ): Promise<any>;
}

export type IReactServiceProviderProps = { children: ReactNode };
