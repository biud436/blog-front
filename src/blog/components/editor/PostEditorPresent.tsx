import { URL_MAP } from '@/common/URL';
import { useCategoryService } from '@/hooks/useCategoryService';
import { CategoryDepthVO } from '@/services/CategoryService';
import { Grid, Typography } from '@mui/material';
import '@toast-ui/editor/dist/toastui-editor.css';

import { observer } from 'mobx-react-lite';
import {
    createRef,
    Suspense,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react';
import { toJS } from 'mobx';
import React from 'react';
import { toast } from 'react-toastify';
import { PostButtonGroup } from './PostButtonGroup';
import { PostSelectCategory } from './PostSelectCategory';
import { PostTitleInput } from './PostTitleInput';
import * as DOMPurify from 'dompurify';

import axios from 'axios';
import { EditPageProps } from '@/blog/pages/editor';
import { usePostService } from '@/hooks/usePostService';
import { PostContent } from '@/services/PostService';
import { useSWRConfig } from 'swr';
import { API_URL } from '@/blog/api/request';
import { useMediaQuery } from 'react-responsive';
import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/router';
import { PostTuiEditor } from './PostTuiEditor';
import { TempPostBox } from './TempPostBox';
import { useRendersCount } from 'react-use';
import { Controller, useForm } from 'react-hook-form';
import { ImageCompressionService } from '@/services/ImageCompressionService';

const EPOCH_EDITOR_TIME = 2000;

export const PostEditorPresent = observer(({ mode }: EditPageProps) => {
    const { control, watch, setValue } = useForm<{ title: string }>({
        defaultValues: {
            title: '',
        },
    });

    const title = watch('title');
    const router = useRouter();
    const [categories, setCategories] = useState<CategoryDepthVO[]>([]);
    const [currentCategoryId, setCurrentCategoryId] = useState(1);
    const editorRef = useRef<any>(null);
    const postService = usePostService();
    const matches = useMediaQuery({
        query: '(max-width: 768px)',
    });
    const { mutate } = useSWRConfig();
    const random = useRef(Date.now());
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
    }, [matches]);
    const rendersCount: number = useRendersCount();

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

                axios
                    .post('/image/s3/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then(res => {
                        const { data } = res.data;

                        callback(data.location, data.originalName);
                    })
                    .catch(err => {
                        toast.error('이미지 업로드에 실패하였습니다.');
                    });
            })
            .catch(err => {
                toast.error('이미지 압축에 실패했습니다.');
            });

        return false;
    };

    /**
     * 글 작성 및 수정 이벤트
     */
    const handleWrite = useCallback(async () => {
        const title_ = watch('title');

        const payload = {
            title: title_,
            // TUI Editor에서 내부에서 DOMPurify를 사용하고 있어서,
            // XSS 공격을 기본적으로 방어하지만 다른 에디터 변경 가능성을 열어두기 위해 추가
            content: DOMPurify.sanitize(
                editorRef.current?.getInstance().getMarkdown(),
            ),
            categoryId: currentCategoryId,
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

                mutate([
                    `${API_URL}/posts/` + postService.getId(),
                    random.current,
                ]);
            } else {
                const res = await postService.writePost(payload);

                if (!res || res.statusCode >= 400) {
                    throw new Error(res.message);
                }
            }

            router.push(URL_MAP.MAIN);
        } catch (e: any) {
            toast.error(e.message);
        }
    }, [editorRef, title, currentCategoryId, mode]);

    /**
     * 글 작성 취소
     */
    const handleCancel = useCallback(() => {
        router.push(URL_MAP.MAIN);
    }, []);

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
            const id = parseInt(router.query.id as string, 10);

            postService
                .getPost(id)
                .then(res => {
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
                .catch(err => {
                    toast.error('글을 불러오는데 실패했습니다.');
                });
        } else {
            setTitle('');
            editorRef.current?.getInstance().setMarkdown('');
        }

        setCategories(getFlatCategories());
    }, [editorRef]);

    useEffect(() => {
        if (postService.isFetchTempPostState()) {
            const { title, content } = postService.getTempPostContent();
            setTitle(title);
            editorRef.current?.getInstance().setMarkdown(content);
            postService.flushTempPostState();
        }
    }, [postService.isFetchTempPost, editorRef.current]);

    const onEditorForcusWhenMount = () => {
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
                <PostSelectCategory
                    key="PostSelectCategory-grid"
                    currentCategoryId={currentCategoryId}
                    setCurrentCategoryId={setCurrentCategoryId}
                    categories={categories}
                />
            </Grid>
            <TempPostBox />
            <Grid item xs={12} lg={12} sm={12}>
                <PostTuiEditor
                    toolbarItems={toolbarItems}
                    onEditorForcusWhenMount={onEditorForcusWhenMount}
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
