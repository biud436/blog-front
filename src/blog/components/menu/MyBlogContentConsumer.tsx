/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { ListItemText } from '@mui/material';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { DrawerHeader } from '@/blog/components/atomic/DrawerHeader';
import { Grid, ListItem } from '@mui/material';
import { CategoryDepthVO } from '@/services/CategoryService';
import { observer } from 'mobx-react-lite';
import { CategoryWrapper } from '../category/CategoryWrapper';
import { LoginGuard } from './LoginGuard';

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
        children:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | React.ReactFragment
            | React.ReactPortal
            | null
            | undefined;
    }) => {
        return (
            <Grid
                container
                spacing={1}
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
                    xs={0}
                    sm={0}
                    md={0}
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'none',
                            md: 'none',
                            lg: 'block',
                            xl: 'block',
                        },
                    }}
                >
                    <List
                        component="nav"
                        sx={{
                            boxShadow: '0 0 0.8em 0 rgba(0, 0, 0, 0.1)',
                            background: 'white',
                        }}
                    >
                        <ListItem
                            sx={{
                                borderLeft: '3px solid #1976d2',
                            }}
                        >
                            <ListItemText
                                primary="카테고리"
                                sx={{ fontWeight: 'bold' }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'black',
                                    }}
                                >
                                    카테고리
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <CategoryWrapper
                            {...{
                                categoryList,
                                setCategoryList,
                                toggleDrawer,
                                router,
                                rootCategory,
                            }}
                        />
                        <LoginGuard />
                    </List>
                </Grid>
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
