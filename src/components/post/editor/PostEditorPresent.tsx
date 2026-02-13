/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { URL_MAP } from '@/common/URL';
import { useCategoryService } from '@/hooks/services/useCategoryService';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { Box, Typography } from '@mui/material';
import '@toast-ui/editor/dist/toastui-editor.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';
import { toast } from 'react-toastify';
import { PostButtonGroup } from './PostButtonGroup';
import { PostSelectCategory } from './PostSelectCategory';
import { PostTitleInput } from './PostTitleInput';

import {
  EditPageProps,
  editorTokens,
} from '@/components/pages/PostEditorContainer';
import { PostTuiEditor } from './PostTuiEditor';
import { Controller, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import usePostService from '@/store/post/PostService';
import { useGetPost } from '@/hooks/api/useGetPost';
import { useRootStore } from '@/store';
import { useToolbarItems } from '@/hooks/useToolbarItems';
import { MyBlogEditorType, MyBlogEditor } from './types/PostEditorType';
import { useAddImageBlob } from '@/hooks/api/useAddImageBlob';
import { usePostWrite } from '@/hooks/api/usePostWrite';

const EPOCH_EDITOR_TIME = 2000;

export const PostEditorPresent = ({ mode }: EditPageProps) => {
  const { control, watch, setValue } = useForm<{ title: string }>({
    defaultValues: {
      title: '',
    },
  });
  const rootStore = useRootStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<CategoryDepthVO[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState(1);
  const editorRef = useRef<MyBlogEditor>(null!);
  const postService = usePostService();
  const toolbarItems = useToolbarItems();

  // Use Hooks
  const { getPost } = useGetPost();

  const categoryService = useCategoryService();
  const { addImageBlobHook } = useAddImageBlob(mode);

  const { handleWrite } = usePostWrite(
    mode,
    editorRef,
    watch,
    currentCategoryId,
  );

  /**
   * 글 작성 취소
   */
  const handleCancel = useCallback(() => {
    router.push(URL_MAP.MAIN);
  }, []);

  /**
   * 타이틀을 변경한다.
   * @param title
   */
  const setTitle = (title: string) => {
    setValue('title', title, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const setMarkdown = (markdown: string) => {
    editorRef.current?.getInstance().setMarkdown(markdown);
  };

  /**
   * 카테고리를 플랫하게 만들어서 반환한다.
   */
  const getFlatCategories = useCallback(() => {
    const raw = categoryService.getCategories();
    const flatCategories: CategoryDepthVO[] = [];

    const makeFlatCategories = (_categories: CategoryDepthVO[]) => {
      _categories.forEach(category => {
        flatCategories.push(category);
        if (category.children) {
          makeFlatCategories(category.children);
        }
      });
    };

    makeFlatCategories(raw);

    return flatCategories;
  }, [categories]);

  useEffect(() => {
    if (mode === 'edit') {
      const id = parseInt(searchParams?.get('id') as string, 10);

      getPost.mutate(id, {
        onSuccess: () => {
          const fetchData = () => {
            setTitle(postService.getTitle());
            setMarkdown(postService.getContent());
          };

          if (!editorRef.current) {
            setTimeout(fetchData, EPOCH_EDITOR_TIME);
          } else {
            fetchData();
          }
        },
        onError: () => {
          toast.error('글을 불러오는데 실패했습니다.');
        },
      });
    } else {
      setTitle('');
      editorRef.current?.getInstance().setMarkdown('');
    }

    setCategories(getFlatCategories());
  }, [editorRef, postService.getFetchCount()]);

  useEffect(() => {
    if (postService.isFetchTempPostState()) {
      const { title, content } = postService.getTempPostContent();
      setTitle(title);
      editorRef.current?.getInstance().setMarkdown(content);
      postService.flushTempPostState();
    }
  }, [postService.isFetchTempPost, editorRef.current]);

  const onEditorFocusWhenMount = () => {
    if (postService.isFetchTempPostState()) {
      const { title, content } = postService.getTempPostContent();
      setTitle(title);
      editorRef.current?.getInstance().setMarkdown(content);
      postService.flushTempPostState();
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Title section */}
      <Box
        sx={{
          padding: {
            xs: '24px 20px',
            sm: '28px 28px',
            md: '32px 48px',
          },
        }}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <PostTitleInput
              key="PostTitleInput-grid"
              title={field.value}
              setTitle={(title: string) => {
                field.onChange(title);
              }}
            />
          )}
        />
      </Box>

      {/* Controls section */}
      <Box
        sx={{
          padding: {
            xs: '0 20px 24px',
            sm: '0 28px 28px',
            md: '0 48px 32px',
          },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 3 },
          alignItems: { sm: 'flex-end' },
        }}
      >
        {/* Category selector */}
        <Box sx={{ flex: 1 }}>
          <PostSelectCategory
            key="PostSelectCategory-grid"
            currentCategoryId={currentCategoryId}
            setCurrentCategoryId={setCurrentCategoryId}
            categories={categories}
          />
        </Box>

        {/* Private toggle */}
        <Box
          component="label"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            userSelect: 'none',
            padding: '10px 16px',
            borderRadius: '8px',
            border: `1px solid ${editorTokens.border}`,
            backgroundColor: rootStore.isPrivate
              ? editorTokens.accentSoft
              : 'transparent',
            transition: 'all 150ms ease',
            whiteSpace: 'nowrap',
            '&:hover': {
              borderColor: editorTokens.borderHover,
              backgroundColor: rootStore.isPrivate
                ? editorTokens.accentSoft
                : editorTokens.parchment,
            },
          }}
        >
          <Box
            component="input"
            type="checkbox"
            checked={rootStore.isPrivate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              rootStore.setIsPrivate(e.target.checked);
            }}
            sx={{
              width: '16px',
              height: '16px',
              accentColor: editorTokens.accent,
              cursor: 'pointer',
            }}
          />
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: rootStore.isPrivate
                ? editorTokens.accent
                : editorTokens.inkSecondary,
            }}
          >
            비공개
          </Typography>
        </Box>
      </Box>

      {/* Editor section */}
      <Box
        sx={{
          borderTop: `1px solid ${editorTokens.border}`,
          borderBottom: `1px solid ${editorTokens.border}`,
          '& .toastui-editor-defaultUI': {
            border: 'none !important',
          },
          '& .toastui-editor-defaultUI .toastui-editor-toolbar': {
            backgroundColor: `${editorTokens.parchment} !important`,
            borderBottom: `1px solid ${editorTokens.border} !important`,
          },
          '& .toastui-editor-md-splitter': {
            backgroundColor: `${editorTokens.border} !important`,
          },
        }}
      >
        <PostTuiEditor
          toolbarItems={toolbarItems}
          onEditorForcusWhenMount={onEditorFocusWhenMount}
          ref={editorRef as MyBlogEditorType}
          addImageBlobHook={addImageBlobHook}
        />
      </Box>

      {/* Footer with buttons */}
      <Box
        sx={{
          padding: {
            xs: '24px 20px 40px',
            sm: '28px 28px 48px',
            md: '32px 48px 56px',
          },
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <PostButtonGroup
          mode={mode}
          handleWrite={handleWrite}
          handleCancel={handleCancel}
        />
      </Box>
    </Box>
  );
};
