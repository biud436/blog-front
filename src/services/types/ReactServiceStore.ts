import { Paginable } from '@/store/types/list';
import { Searchable } from '@/store/types/searchable';
import { ReactNode } from 'react';

export type ReactServiceStore<T> = Searchable<T> & Paginable;

export interface IReactService<T> {
    search(pageNumber: number, searchProperty: string, searchQuery: string);
    view(pageNumber: number);
    fetch(store: ReactServiceStore<T>): Promise<any>;
}

export type IReactServiceProviderProps = { children: ReactNode };
