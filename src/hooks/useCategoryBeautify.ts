import { CategoryDepthVO } from '@/services/CategoryService';
import axios from 'axios';
import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then(res => res.data.data);

export function useCategoryBeautify() {
    const { data: categories } = useSWR<CategoryDepthVO[]>(
        '/admin/category?isBeautify=true',
        fetcher,
    );

    return categories;
}

export interface CategoryPostCount {
    id: number;
    name: string;
    children: number;
    depth: number;
    postCount: number;
}
