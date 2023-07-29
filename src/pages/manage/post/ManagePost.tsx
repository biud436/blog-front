import React, { useEffect, useRef } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Link,
    Pagination,
    Stack,
    ThemeProvider,
    Typography,
    createTheme,
    styled,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ManageLayout } from '@/layouts/ManageLayout';
import { useRouter } from 'next/router';
import { useAdminPost } from '@/hooks/api/useAdminPost';
import MyBlogError from '@/pages/_error';
import { postsStore } from '@/store';

const theme = createTheme({
    components: {},
});

const Wrapper = styled(Box)`
    background-color: #fff;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
`;

export const ManagePost = observer(() => {
    const router = useRouter();
    const { data, isLoading, error } = useAdminPost();
    const tempPageNumber = useRef(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        postsStore.setPageNumber(value);
    };

    const goToBack = () => {
        router.back();
    };

    // MOUNTED
    useEffect(() => {
        tempPageNumber.current = postsStore.getPageNumber();
        postsStore.setPageNumber(1);

        // UNMOUNTED
        return () => {
            postsStore.setPageNumber(tempPageNumber.current);
        };
    }, []);

    if (error) {
        return <MyBlogError />;
    }

    if (isLoading) {
        return (
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <ManageLayout>
                <Wrapper>
                    <Stack gap={1} direction={'column'}>
                        <Box
                            justifyContent={'flex-start'}
                            gap={2}
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'flex-start'}
                        >
                            <Typography variant="h4">게시물 관리</Typography>
                            <Button variant="text" onClick={goToBack}>
                                뒤로가기
                            </Button>
                        </Box>
                        <Divider
                            variant="middle"
                            sx={{
                                backgroundColor:
                                    'rgba(0, 0, 0, 0.12) !important',
                            }}
                        />
                    </Stack>
                    <Stack direction="column" p={1} gap={1}>
                        {data?.entities.map(post => (
                            <Box
                                key={post.id + 'ADMIN_POST_' + post.title}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    gap: 1,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    component={Link}
                                    onClick={() =>
                                        router.push(`/posts/${post.id}`)
                                    }
                                    sx={{
                                        cursor: 'pointer',
                                        textDecoration: 'none',

                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    [{post.id}] - {post.title}
                                </Typography>
                                <Button variant="text">수정</Button>
                            </Box>
                        ))}
                    </Stack>
                    <Stack
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        direction="row"
                        p={1}
                        gap={1}
                    >
                        <Pagination
                            count={data?.pagination.maxPage}
                            page={postsStore.getPageNumber()}
                            onChange={handleChange}
                        />
                    </Stack>
                </Wrapper>
            </ManageLayout>
        </ThemeProvider>
    );
});
