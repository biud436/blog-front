'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DrawerHeader } from '@/blog/components/atomic/DrawerHeader';
import { Grid } from '@mui/material';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { observer } from 'mobx-react-lite';

export const MyBlogContentConsumer = observer(
    ({
        categoryList,
        setCategoryList,
        toggleDrawer,
        router,
        rootCategory,
        children,
    }: {
        categoryList: CategoryDepthVO[];
        setCategoryList: React.Dispatch<
            React.SetStateAction<CategoryDepthVO[]>
        >;
        toggleDrawer: (
            open: boolean,
        ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
        router;
        rootCategory: CategoryDepthVO | undefined;
        children: React.ReactNode;
    }) => {
        return (
            <Grid
                container
                spacing={0}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    alignItems: 'start',
                    flexWrap: 'nowrap',
                    flexDirection: 'row',
                    gap: 1,
                    width: '100%',
                    p: 2,
                    m: 0,
                }}
            >
                <DrawerHeader />
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={9}
                    xl={9}
                    sx={{
                        color: '#000',
                        opacity: 1,
                    }}
                >
                    {children}
                </Grid>
            </Grid>
        );
    },
);
