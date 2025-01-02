/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Divider,
  Link,
  MenuItem,
  Pagination,
  Select,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from '@mui/material';
import { useAdminPost } from '@/hooks/api/useAdminPost';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import Swal from 'sweetalert2';
import { notFound, useRouter } from 'next/navigation';
import usePostsStore from '@/store/posts';

const theme = createTheme({
  palette: {},
  components: {},
});

const Wrapper = styled(Box)`
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
`;

const ManagePost = () => {
  const router = useRouter();
  const { data, error } = useAdminPost();
  const tempPageNumber = useRef(1);
  const postsStore = usePostsStore();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    postsStore.setPageNumber(value);
  };

  const goToBack = () => {
    router.back();
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '정말로 삭제하시겠습니까?',
      text: '삭제된 데이터는 복구할 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    });

    if (!result.isConfirmed) {
      return;
    }
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
    return notFound();
  }

  return (
    <ThemeProvider theme={theme}>
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
              backgroundColor: 'rgba(0, 0, 0, 0.12) !important',
            }}
          />
        </Stack>
        <Stack direction="row" justifyContent={'flex-end'}>
          <PageOption />
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
                onClick={() => router.push(`/posts/${post.id}`)}
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: '#020202',

                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                [{post.id}] - {post.title}
              </Typography>
              <Stack direction={'row'}>
                <Button variant="text">수정</Button>
                <Button variant="text" color="warning" onClick={handleDelete}>
                  삭제
                </Button>
              </Stack>
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
    </ThemeProvider>
  );
};

const PageOption = () => {
  const postsStore = usePostsStore();
  const changePageOption: SelectInputProps<number>['onChange'] = event => {
    postsStore.setPageSize((event.target as any).value);
  };

  return (
    <Select
      value={postsStore.getPageSize()}
      onChange={changePageOption}
      size="small"
      sx={{
        m: 1,
      }}
    >
      <MenuItem value={10}>10 페이지</MenuItem>
      <MenuItem value={20}>20 페이지</MenuItem>
      <MenuItem value={50}>50 페이지</MenuItem>
      <MenuItem value={100}>100 페이지</MenuItem>
    </Select>
  );
};

export default ManagePost;
