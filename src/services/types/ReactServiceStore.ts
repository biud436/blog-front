/* eslint-disable @typescript-eslint/no-explicit-any */
import { Paginable } from '@/models/Paginable';
import { Searchable } from '@/models/Searchable';
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
