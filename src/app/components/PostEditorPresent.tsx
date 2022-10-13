import { URL_MAP } from '@/common/URL';
import { useCategoryService } from '@/hooks/useCategoryService';
import { CategoryDepthVO } from '@/services/CategoryService';
import {
    Button,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toJS } from 'mobx';
import { useAuth } from '../providers/authProvider';
import React from 'react';
import { toast } from 'react-toastify';

export const PostEditorPresent = observer(() => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryDepthVO[]>([]);
    const [title, setTitle] = useState('');
    const [currentCategoryId, setCurrentCategoryId] = useState(1);
    const editorRef = React.createRef<Editor>();

    const categoryService = useCategoryService();

    const handleWrite = async () => {
        try {
            const res = await auth.requestData('post', '/posts', {
                title,
                content: editorRef.current?.getInstance().getMarkdown(),
                categoryId: currentCategoryId,
            });

            if (!res || res.statusCode >= 400) {
                throw new Error(res.message);
            }

            navigate(URL_MAP.MAIN);
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    const handleCancel = () => {
        navigate(URL_MAP.MAIN);
    };

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
        setCategories(getFlatCategories());
    }, []);

    return (
        <Grid container>
            <Grid item xs={12} lg={12} md={12}>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel>제목</InputLabel>
                    <Input
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={e => {
                            setTitle(e.target.value);
                        }}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel>카테고리 선택</InputLabel>
                    <Select
                        value={currentCategoryId}
                        onChange={e => setCurrentCategoryId(+e.target.value)}
                    >
                        {categories.map(category => {
                            return (
                                <MenuItem value={category.id} key={category.id}>
                                    {[...Array(category.depth)].map(
                                        (e, index) => {
                                            return <>&nbsp;&nbsp;</>;
                                        },
                                    )}
                                    {category.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
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
                    hideModeSwitch={true}
                    ref={editorRef}
                />
            </Grid>
            <Grid container justifyContent="center" sx={{ padding: 2 }}>
                <Grid item sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            handleWrite();
                        }}
                    >
                        작성
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleCancel()}
                    >
                        취소
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
});
