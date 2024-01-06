'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL_MAP } from '@/common/URL';
import { useCategoryService } from '@/hooks/services/useCategoryService';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
} from '@mui/material';
import '@toast-ui/editor/dist/toastui-editor.css';

import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toJS } from 'mobx';
import React from 'react';
import { toast } from 'react-toastify';
import { PostButtonGroup } from './PostButtonGroup';
import { PostSelectCategory } from './PostSelectCategory';
import { PostTitleInput } from './PostTitleInput';
import * as DOMPurify from 'dompurify';

import { EditPageProps } from '@/containers/PostEditorContainer';
import { usePostService } from '@/hooks/services/usePostService';
import { PostContent } from '@/services/PostService';
import { useSWRConfig } from 'swr';
import { useMediaQuery } from 'react-responsive';
import { PostTuiEditor } from './PostTuiEditor';
import { Controller, useForm } from 'react-hook-form';
import { ImageCompressionService } from '@/services/ImageCompressionService';
import { rootStore } from '@/store';
import uploadS3 from '@/blog/api/uploadS3';
import { useRouter, useSearchParams } from 'next/navigation';

const EPOCH_EDITOR_TIME = 2000;

export const PostEditorPresent = observer(({ mode }: EditPageProps) => {
    const { control, watch, setValue } = useForm<{ title: string }>({
        defaultValues: {
            title: '',
        },
    });

    const title = watch('title');
    const router = useRouter();
    const searchParams = useSearchParams();
    const [categories, setCategories] = useState<CategoryDepthVO[]>([]);
    const [currentCategoryId, setCurrentCategoryId] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editorRef = useRef<any>(null);
    const postService = usePostService();
    const matches = useMediaQuery({
        query: '(max-width: 768px)',
    });
    const { mutate } = useSWRConfig();
    const toolbarItems = useMemo(() => {
        if (!matches) {
            return [
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'],
                ['table', 'image', 'link'],
                ['code', 'codeblock'],
                ['scrollSync'],
            ];
        } else {
            return [['image'], ['heading', 'bold'], ['codeblock']];
        }
    }, [matches]) as any;

    const categoryService = useCategoryService();

    /**
     * 이미지 업로드 시, 훅을 통해 서버에 업로드 요청을 보낸다.
     *
     * @param blob
     * @param callback
     */
    const addImageBlobHook = (blob, callback) => {
        ImageCompressionService.compress(blob, ImageCompressionService.options)
            .then(compressedFile => {
                const formData = new FormData();
                formData.append('files', compressedFile);
                formData.append(
                    'postId',
                    mode === 'edit' ? postService.getId() + '' : '0',
                );

                uploadS3(formData)
                    .then(res => {
                        const { data } = res.data;

                        callback(data.location, data.originalName);
                    })
                    .catch(() => {
                        toast.error('이미지 업로드에 실패하였습니다.');
                    });
            })
            .catch(() => {
                toast.error('이미지 압축에 실패했습니다.');
            });

        return false;
    };

    /**
     * 글 작성 및 수정 이벤트
     */
    const handleWrite = useCallback(async () => {
        const title_ = watch('title');

        if (!title_) {
            toast.error('제목을 입력해주세요.');
            return;
        }

        const content = editorRef.current?.getInstance().getMarkdown();

        if (!content) {
            toast.error('내용을 입력해주세요.');
            return;
        }

        const payload = {
            title: title_,
            // TUI Editor에서 내부에서 DOMPurify를 사용하고 있어서,
            // XSS 공격을 기본적으로 방어하지만 다른 에디터 변경 가능성을 열어두기 위해 추가
            content: DOMPurify.sanitize(content),
            categoryId: currentCategoryId,
            isPrivate: rootStore.isPrivate,
        } as PostContent;

        try {
            if (mode === 'edit') {
                const res = await postService.updatePost(
                    postService.getId(),
                    payload,
                );

                if (!res || res.statusCode >= 400) {
                    throw new Error(res.message);
                }

                mutate(['/posts', postService.getId()]);
            } else {
                const res = await postService.writePost(payload);

                if (!res || res.statusCode >= 400) {
                    throw new Error(res.message);
                }

                postService.refresh();
            }

            router.push(URL_MAP.MAIN);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            toast.error(e.message);
        }
    }, [editorRef, title, currentCategoryId, mode, rootStore.isPrivate]);

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

            /**
             * 새로 작성된 글을 불러오지 못하는 현상이 있다.
             * 이는 의존성 배열에서 글이 수정되었다는 것을 감지하지 못하기 때문이다.
             */
            postService
                .getPost(id)
                .then(() => {
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
                })
                .catch(() => {
                    toast.error('글을 불러오는데 실패했습니다.');
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
            <Grid item xs={12} lg={12} md={12}>
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
                                rootStore.isPrivate = checked;
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
            <Grid item xs={12} lg={12} sm={12}>
                <PostTuiEditor
                    toolbarItems={toolbarItems}
                    onEditorForcusWhenMount={onEditorFocusWhenMount}
                    ref={editorRef}
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
