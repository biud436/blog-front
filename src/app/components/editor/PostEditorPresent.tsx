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
    useMemo,
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
import { EditPageProps } from '@/app/pages/editor';
import { usePostService } from '@/hooks/usePostService';
import { PostContent } from '@/services/PostService';
import { useSWRConfig } from 'swr';
import { API_URL } from '@/app/api/request';
import { useMediaQuery } from 'react-responsive';
import imageCompression from 'browser-image-compression';

export const PostEditorPresent = observer(({ mode }: EditPageProps) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryDepthVO[]>([]);
    const [title, setTitle] = useState('');
    const [currentCategoryId, setCurrentCategoryId] = useState(1);
    const editorRef = useRef<Editor>(null);
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

    const categoryService = useCategoryService();

    /**
     * 이미지 업로드 시, 훅을 통해 서버에 업로드 요청을 보낸다.
     *
     * @param blob
     * @param callback
     */
    const addImageBlobHook = (blob, callback) => {
        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        imageCompression(blob, options)
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
        const payload = {
            title,
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

            navigate(URL_MAP.MAIN);
        } catch (e: any) {
            toast.error(e.message);
        }
    }, [editorRef, title, currentCategoryId, mode]);

    const handleCancel = useCallback(() => {
        navigate(URL_MAP.MAIN);
    }, []);

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
            setTitle(postService.getTitle());
            editorRef.current
                ?.getInstance()
                .setMarkdown(postService.getContent());
        }

        setCategories(getFlatCategories());
    }, []);

    return (
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
                    toolbarItems={toolbarItems}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                    ref={editorRef}
                    viewer={true}
                    hooks={{
                        addImageBlobHook,
                    }}
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
