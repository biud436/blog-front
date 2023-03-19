import { CategoryDepthVO } from '@/services/CategoryService';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { CategoryPostCount } from './CategoryPostCount';

export const fetcher = (url: string) =>
    axios.get(url).then(res => res.data.data);

export type PostCountMap = {
    [key: string | number]: number;
};

export function useCategoryTree() {
    const [postCountMap, setPostCountMap] = useState<PostCountMap>({});
    const isReady = useRef(false);
    const { data: postCountData } = useSWR<CategoryPostCount[]>(
        '/posts/categories',
        fetcher,
    );
    const {
        data: categories,
        error,
        isValidating,
    } = useSWR<CategoryDepthVO[]>(
        isReady.current ? '/admin/category?isBeautify=true' : null,
        fetcher,
    );

    const changeCategoryName = (_categoryList: CategoryDepthVO[]) => {
        _categoryList.forEach(category => {
            if (category.children) {
                changeCategoryName(category.children);
            }
            category.name = category.name.includes('(')
                ? category.name
                : `${category.name} (${postCountMap[category.id] || 0})`;
        });
    };

    const checkCategoriesOpen = (categories: CategoryDepthVO[]) => {
        categories.forEach(category => {
            category.open = true;
            if (category.children.length > 0) {
                checkCategoriesOpen(category.children);
            }
        });
    };

    useEffect(() => {
        if (postCountData) {
            const map = postCountData.reduce((acc, cur) => {
                acc[cur.id] = cur.postCount;
                return acc;
            }, {});

            setPostCountMap(map);
            isReady.current = true;
        }
    }, [postCountData]);

    useEffect(() => {
        if (categories) {
            changeCategoryName(categories);
            checkCategoriesOpen(categories);
        }
    }, [categories, postCountMap]);

    return { categories, error, isValidating };
}
