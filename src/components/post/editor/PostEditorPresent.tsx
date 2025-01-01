/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { URL_MAP } from '@/common/URL';
import { useCategoryService } from '@/hooks/services/useCategoryService';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid2 as Grid,
} from '@mui/material';
import '@toast-ui/editor/dist/toastui-editor.css';

import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toJS } from 'mobx';
import React from 'react';
import { toast } from 'react-toastify';
import { PostButtonGroup } from './PostButtonGroup';
import { PostSelectCategory } from './PostSelectCategory';
import { PostTitleInput } from './PostTitleInput';

import { EditPageProps } from '@/components/pages/PostEditorContainer';
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

export const PostEditorPresent = observer(({ mode }: EditPageProps) => {
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
  const editorRef = useRef<MyBlogEditor>(null);
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

  /**
   * 카테고리를 플랫하게 만들어서 반환한다.
   */
  const getFlatCategories = useCallback(() => {
    const raw = toJS(categoryService.getCategories());
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
            editorRef.current
              ?.getInstance()
              .setMarkdown(postService.getContent());
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
    <Grid container>
      <Grid size={{ xs: 12, lg: 12, md: 12 }}>
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
        <Box className={'p-2 hover:bg-gray-100'}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="비공개"
              checked={rootStore.isPrivate}
              onChange={(_, checked) => {
                rootStore.setIsPrivate(checked);
              }}
            />
          </FormGroup>
        </Box>
        <PostSelectCategory
          key="PostSelectCategory-grid"
          currentCategoryId={currentCategoryId}
          setCurrentCategoryId={setCurrentCategoryId}
          categories={categories}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 12,
          lg: 12,
        }}
      >
        <PostTuiEditor
          toolbarItems={toolbarItems}
          onEditorForcusWhenMount={onEditorFocusWhenMount}
          ref={editorRef as MyBlogEditorType}
          addImageBlobHook={addImageBlobHook}
        />
      </Grid>
      <Grid container justifyContent="center" sx={{ padding: 2 }}>
        <PostButtonGroup
          mode={mode}
          handleWrite={handleWrite}
          handleCancel={handleCancel}
        />
      </Grid>
    </Grid>
  );
});
