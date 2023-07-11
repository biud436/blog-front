import * as React from 'react';
import { useCallback } from 'react';
import List from '@mui/material/List';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { URL_MAP } from '@/common/URL';
import { Collapse } from '@mui/material';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { useCategoryService } from '@/hooks/services/useCategoryService';
import { observer } from 'mobx-react-lite';
import { NextRouter } from 'next/router';

interface CategoryWrapperProps {
    categoryList: CategoryDepthVO[];
    setCategoryList: React.Dispatch<React.SetStateAction<CategoryDepthVO[]>>;
    toggleDrawer: (
        open: boolean,
    ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
    router: NextRouter;
    rootCategory: CategoryDepthVO | undefined;
}

export const CategoryWrapper = React.memo(
    observer(
        ({
            categoryList,
            setCategoryList,
            toggleDrawer,
            router,
            rootCategory,
        }: CategoryWrapperProps) => {
            const categoryService = useCategoryService();
            // const { category: categoryService } = useRootService();

            /**
             * 카테고리 리스트를 동적으로 생성합니다.
             *
             * @param categories
             * @returns {JSX.Element} JSX.Element
             */
            const makeCategoryList = useCallback(
                (categories: CategoryDepthVO[]) => {
                    return categories.map((category, index) => {
                        const isNotEmpty = category.children.length > 0;
                        const key = `category-${index}`;

                        return (
                            <React.Fragment key={key}>
                                <ListItemButton
                                    onClick={() => {
                                        if (isNotEmpty) {
                                            setCategoryList([...categoryList]);
                                        }

                                        categoryService.setCurrentMenuCategoryId(
                                            rootCategory === category
                                                ? null
                                                : category.id,
                                        );
                                        toggleDrawer(false);
                                        router.push(URL_MAP.MAIN);
                                    }}
                                    onKeyDown={toggleDrawer(false)}
                                    sx={{
                                        pl: category.depth * 2,
                                        backgroundColor:
                                            categoryService.currentMenuCategoryId ===
                                            category.id
                                                ? 'rgba(71, 94, 129, 0.678)'
                                                : 'transparent',
                                        '&:hover': {
                                            backgroundColor:
                                                'rgba(109, 109, 109, 0.678)',
                                        },
                                        transition: 'background-color 0.3s',
                                    }}
                                >
                                    <ListItemIcon>
                                        {isNotEmpty ? (
                                            <ExpandMore />
                                        ) : (
                                            <ChevronRightIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={category.name} />
                                </ListItemButton>
                                {isNotEmpty && (
                                    <Collapse
                                        in={category.open}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding>
                                            {makeCategoryList(
                                                category.children,
                                            )}
                                        </List>
                                    </Collapse>
                                )}
                            </React.Fragment>
                        );
                    });
                },
                [categoryList],
            );

            return <>{makeCategoryList(categoryList)}</>;
        },
    ),
);
