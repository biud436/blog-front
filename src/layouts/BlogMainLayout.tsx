import * as React from 'react';
import { useEffect, useCallback, useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Link } from '@mui/material';
import { API_URL } from '../blog/api/request';
import axios, { AxiosResponse } from 'axios';
import { CategoryDepthVO } from '@/services/CategoryService';
import { useCategoryService } from '@/hooks/useCategoryService';
import { observer } from 'mobx-react-lite';
import { useMediaQuery } from 'react-responsive';
import { menuStore } from '@/store/';
import { drawerWidth } from '../blog/components/menu/AppBar';
import { useRouter } from 'next/router';
import { MyBlogHeader } from '../blog/components/header/MyBlogHeader';
import { MobileNav } from '../blog/components/menu/MobileNav';
import { MobileHamburger } from '../blog/components/menu/MobileHamburger';
import { MyBlogFooter } from '../blog/components/menu/MyBlogFooter';
import { MyBlogContentContainer } from '../blog/components/menu/MyBlogContentContainer';
import { MyBlogContentConsumer } from '../blog/components/menu/MyBlogContentConsumer';

export const PageWrapper = observer(
    ({ name, children }: { name: string; children: React.ReactNode }) => {
        const router = useRouter();
        const matches = useMediaQuery({
            query: '(max-width: 768px)',
        });
        const theme = useTheme();
        const [categoryList, setCategoryList] = useState<CategoryDepthVO[]>([]);
        const [rootCategory, setRootCategory] = useState<CategoryDepthVO>();
        const categoryService = useCategoryService();

        const handleDrawerOpen = useCallback(
            (e: React.MouseEvent) => {
                menuStore.open();
            },
            [menuStore.isOpen],
        );

        const handleDrawerClose = useCallback(() => {
            menuStore.close();
        }, [menuStore.isOpen]);

        const toggleDrawer = useCallback(
            (open: boolean) =>
                (event: React.KeyboardEvent | React.MouseEvent) => {
                    const keyboardEvent = event as React.KeyboardEvent;
                    const isPressedTabOrShift =
                        event.type === 'keydown' &&
                        (keyboardEvent.key === 'Tab' ||
                            keyboardEvent.key === 'Shift');

                    if (isPressedTabOrShift) {
                        event.preventDefault();
                    }

                    menuStore.setOpen(open);
                },
            [menuStore.isOpen],
        );

        /**
         * 카테고리 목록 초기화
         *
         * TODO: SWR과 Custom Hook으로 변경해야 합니다.
         * @returns
         */
        const initCategories = useCallback(async () => {
            const res: AxiosResponse<any> = await axios.get(
                `${API_URL}/admin/category?isBeautify=true`,
                {},
            );

            const categories: CategoryDepthVO[] = res.data.data;

            const { data: postCountData } = await axios.get(
                `${API_URL}/posts/categories`,
            );
            const postCountMap = postCountData.data.reduce(
                (acc: any, cur: any) => {
                    acc[cur.id] = cur.postCount;
                    return acc;
                },
                {},
            );

            const getCategory = (_categoryList: CategoryDepthVO[]) => {
                _categoryList.forEach(category => {
                    if (category.children) {
                        getCategory(category.children);
                    }
                    category.name = `${category.name} (${
                        postCountMap[category.id]
                    })`;
                });
            };

            getCategory(categories);

            checkCategoriesOpen(categories);
            setCategoryList(categories);

            // 몹엑스와 연동
            categoryService.setCategories(categories);

            setRootCategory(categories[0]);

            return categories;
        }, [categoryList]);

        const checkCategoriesOpen = (categories: CategoryDepthVO[]) => {
            categories.forEach(category => {
                category.open = true;
                if (category.children.length > 0) {
                    checkCategoriesOpen(category.children);
                }
            });
        };

        const initWithSettings = async () => {
            await initCategories();
        };

        const onMenuCloseHandler = (e: MouseEvent) => {
            if (menuStore.isOpen) {
                const target = e.target as HTMLElement;

                if (e.clientX > drawerWidth) {
                    menuStore.close();
                }
            }
        };

        useEffect(() => {
            initWithSettings();
        }, [matches]);

        useEffect(() => {
            if (typeof window !== 'undefined') {
                window.addEventListener(
                    'mousedown',
                    onMenuCloseHandler.bind(this),
                    false,
                );
            }

            return () => {
                if (typeof window !== 'undefined') {
                    window.removeEventListener(
                        'mousedown',
                        onMenuCloseHandler.bind(this),
                        false,
                    );
                }
            };
        }, []);

        return (
            <Box
                sx={{
                    width: '100%',
                    background: 'white',
                }}
            >
                <CssBaseline />
                <MobileHamburger {...{ handleDrawerOpen, router, name }} />
                <MobileNav
                    {...{
                        toggleDrawer,
                        handleDrawerClose,
                        theme,
                        categoryList,
                        setCategoryList,
                        router,
                        rootCategory,
                    }}
                />
                <MyBlogContentContainer>
                    <MyBlogHeader router={router} />
                    <MyBlogContentConsumer
                        {...{
                            categoryList,
                            setCategoryList,
                            toggleDrawer,
                            router,
                            rootCategory,
                        }}
                    >
                        {children}
                    </MyBlogContentConsumer>
                </MyBlogContentContainer>
                <MyBlogFooter />
            </Box>
        );
    },
);
