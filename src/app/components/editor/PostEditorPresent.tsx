import { URL_MAP } from '@/common/URL';
import { useCategoryService } from '@/hooks/useCategoryService';
import { CategoryDepthVO } from '@/services/CategoryService';
import { Grid, Typography } from '@mui/material';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { observer } from 'mobx-react-lite';
import {
    createRef,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';
import { useNavigate } from 'react-router';
import { toJS } from 'mobx';
import { useAuth } from '../../providers/auth/authProvider';
import React from 'react';
import { toast } from 'react-toastify';
import { PostButtonGroup } from './PostButtonGroup';
import { PostSelectCategory } from './PostSelectCategory';
import { PostTitleInput } from './PostTitleInput';
import { useAuthorized } from '@/hooks/useAuthorized';
import * as DOMPurify from 'dompurify';

import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-clojure.js';
import 'prismjs/components/prism-typescript.js';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import axios from 'axios';
import { usePost } from '@/hooks/usePost';
import { EditPageProps } from '@/app/pages/editor';
import { usePostService } from '@/hooks/usePostService';
import { usePostsService } from '@/hooks/usePostsService';
import { PostsServiceProvider } from '@/services/PostsService';
import { PostContent } from '@/services/PostService';
import { useSWRConfig } from 'swr';
import { API_URL } from '@/app/api/request';

export const PostEditorPresent = observer(({ mode }: EditPageProps) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryDepthVO[]>([]);
    const [title, setTitle] = useState('');
    const [currentCategoryId, setCurrentCategoryId] = useState(1);
    const editorRef = createRef<Editor>();
    const postService = usePostService();
    const { mutate } = useSWRConfig();

    const categoryService = useCategoryService();

    const addImageBlobHook = async (blob, callback) => {
        const formData = new FormData();
        formData.append('files', blob);
        formData.append(
            'postId',
            mode === 'edit' ? postService.getId() + '' : '0',
        );

        const res = await axios.post('/image/s3/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const { data } = res.data;

        callback(data.location, data.originalName);
    };

    const handleWrite = useCallback(async () => {
        const payload = {
            title,
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

                mutate(`${API_URL}/posts/` + postService.getId());
            } else {
                const res = await postService.writePost(payload);

                if (!res || res.statusCode >= 400) {
                    throw new Error(res.message);
                }
            }

            navigate(URL_MAP.MAIN);
        } catch (e: any) {
            toast.error(e.message);
        }
    }, [editorRef, title, currentCategoryId, mode]);

    const handleCancel = useCallback(() => {
        navigate(URL_MAP.MAIN);
    }, []);

    const getFlatCategories = () => {
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
    };

    useEffect(() => {
        if (mode === 'edit') {
            setTitle(postService.getTitle());
            editorRef.current
                ?.getInstance()
                .setMarkdown(postService.getContent());
        }

        setCategories(getFlatCategories());
    }, []);

    return (
        <>
            <Grid container>
                <Grid item xs={12} lg={12} md={12}>
                    <PostTitleInput
                        key="PostTitleInput-grid"
                        title={title}
                        setTitle={setTitle}
                    />
                    <PostSelectCategory
                        key="PostSelectCategory-grid"
                        currentCategoryId={currentCategoryId}
                        setCurrentCategoryId={setCurrentCategoryId}
                        categories={categories}
                    />
                </Grid>
                <Grid item xs={12} lg={12} sm={12}>
                    <Editor
                        usageStatistics={false}
                        initialValue={''}
                        previewHighlight={false}
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        css={{
                            width: '100%',
                        }}
                        height="600px"
                        plugins={[
                            [codeSyntaxHighlight, { highlighter: Prism }],
                        ]}
                        ref={editorRef}
                        viewer={true}
                        hooks={{
                            addImageBlobHook,
                        }}
                    />
                </Grid>
                <Grid container justifyContent="center" sx={{ padding: 2 }}>
                    <PostButtonGroup
                        handleWrite={handleWrite}
                        handleCancel={handleCancel}
                    />
                </Grid>
            </Grid>
        </>
    );
});
