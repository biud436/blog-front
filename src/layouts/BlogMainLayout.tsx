'use client';

import React from 'react';
import { useEffect, useCallback, useState } from 'react';
import { useTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { useCategoryService } from '@/hooks/services/useCategoryService';
import { observer } from 'mobx-react-lite';
import { useMediaQuery } from 'react-responsive';
import { menuStore } from '@/store/';
import { MyBlogHeader } from '../blog/components/common/header/MyBlogHeader';
import { MobileNav } from '../blog/components/common/menu/MobileNav';
import { MobileHamburger } from '../blog/components/common/menu/MobileHamburger';
import { MyBlogContentContainer } from '../blog/components/common/menu/MyBlogContentContainer';
import { MyBlogContentConsumer } from '../blog/components/common/menu/MyBlogContentConsumer';
import { useCategoryTree } from '@/hooks/api/useCategoryTree';
import { useRouter } from 'next/navigation';

export const MainLayout = observer(
    ({ name, children }: { name: string; children: React.ReactNode }) => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const router = useRouter();
        const matches = useMediaQuery({
            query: '(max-width: 768px)',
        });
        const theme = useTheme();
        const [categoryList, setCategoryList] = useState<CategoryDepthVO[]>([]);
        const [rootCategory, setRootCategory] = useState<CategoryDepthVO>();
        const categoryService = useCategoryService();
        const { categories, error: isCategoryError } = useCategoryTree();

        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleDrawerOpen = useCallback(() => {
            menuStore.open();
        }, []);

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

        const initCategories = () => {
            if (!categories) {
                return;
            }

            setCategoryList(categories);
            categoryService.setCategories(categories);
            setRootCategory(categories[0]);

            return categories;
        };

        useEffect(() => {
            initCategories();
        }, [matches, categories, isCategoryError]);

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
                        handleDrawerClose: handleClose,
                        theme,
                        categoryList,
                        setCategoryList,
                        router,
                        rootCategory,
                        anchorEl,
                    }}
                />
                <MyBlogContentContainer>
                    <MyBlogHeader />
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
            </Box>
        );
    },
);
