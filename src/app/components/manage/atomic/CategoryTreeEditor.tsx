import {
    Button,
    FormControlLabel,
    Checkbox,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    ThemeProvider,
    CssBaseline,
    Grid,
    Divider,
    Box,
    Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { createTheme, SxProps } from '@mui/material/styles';
import { DndProvider, useDrag } from 'react-dnd';
import {
    Tree,
    MultiBackend,
    DragLayerMonitorProps,
    getDescendants,
    getBackendOptions,
    NodeModel,
} from '@minoru/react-dnd-treeview';
import { TouchBackend } from 'react-dnd-touch-backend';
import AddIcon from '@mui/icons-material/Add';
import CopyIcon from '@mui/icons-material/FileCopy';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { URL_MAP } from '@/common/URL';
import { toJS } from 'mobx';
import { CategoryDepthVO } from '@/services/CategoryService';
import { useCategoryService } from '@/hooks/useCategoryService';
import { API_URL } from '@/app/api/request';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Theme } from '@mui/system';
import { CategoryEditSection } from './CategoryEditSection';
import { CategoryAddDialog } from './CategoryAddDialog';
import {
    CategoryNodeEventHandler,
    CategoryNodeEditEventHandler,
    CategoryModel,
    FreeNodeModel,
    CategoryResultTuple,
    CategoryTreeModel,
} from './CategoryTypes';
import { DragPreview } from './DragPreview';
import { CategoryEditorHeader } from './CategoryEditorHeader';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    margin: 0,
                    padding: 0,
                },
                'html, body, #root': {
                    height: '100%',
                },
                ul: {
                    listStyle: 'none',
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: { verticalAlign: 'middle' },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: { color: 'inherit' },
            },
        },
    },
});

export interface CategoryNodeProps<T> {
    node: NodeModel<T>;
    depth: number;
    isOpen: boolean;
    onToggle: CategoryNodeEventHandler;
    onDelete: CategoryNodeEventHandler;
    onCopy: CategoryNodeEventHandler;
    onEdit: CategoryNodeEditEventHandler;
}

export const CategoryNode = observer(
    ({
        node,
        depth,
        isOpen,
        onToggle,
        onDelete,
        onCopy,
        onEdit,
    }: CategoryNodeProps<CategoryModel>) => {
        const [categoryName, setCategoryName] = useState(node.text);
        const [editMode, setEditMode] = useState(false);
        const categoryNodeProp: SxProps<Theme> = useMemo(() => {
            return {
                m: 1,
                ml: depth * 1.2,
                p: 1,
                boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
                borderRadius: 1,
                borderLeft: '3px solid #1976d2',

                '&:hover': {
                    background: 'rgba(0, 0, 0, 0.04)',
                    cursor: 'move',
                },
            };
        }, [depth]);
        const handleToggle = useCallback(() => {
            onToggle(node.id);
        }, [node.id, onToggle]);

        const emitOnEdit = useCallback(
            (nodeId: string | number) => {
                setEditMode(true);
            },
            [onEdit],
        );

        const handleSubmit = useCallback(() => {
            setEditMode(false);
            onEdit(node.id, categoryName);
        }, [node.id, categoryName]);

        const onChangeInput = (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            setCategoryName(e.target.value);
        };

        /**
         * 카테고리에 children이 있으면 펼쳐지는 클릭 핸들러를 장착한다.
         */
        if (node.droppable) {
            return (
                <Grid
                    container
                    spacing={1}
                    sx={{
                        mb: 2,
                        ml: depth * 1.2,
                        '&:hover': {
                            background: 'rgba(0, 0, 0, 0.02)',
                        },
                        borderRadius: 1,
                    }}
                    onClick={handleToggle}
                >
                    <Grid item pl={depth * 2}>
                        <Button
                            variant="text"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    color: 'text.primary',
                                },
                                ...categoryNodeProp,
                            }}
                            startIcon={
                                isOpen ? <ArrowDropDown /> : <ArrowRight />
                            }
                        >
                            {node.text}
                        </Button>
                    </Grid>
                </Grid>
            );
        }

        return (
            <Grid container spacing={0} sx={categoryNodeProp}>
                {!editMode && (
                    <Grid item xs={11}>
                        <Typography
                            sx={{
                                m: 1,
                                color: 'text.secondary',
                            }}
                            variant="body2"
                        >
                            {node.text}
                        </Typography>
                    </Grid>
                )}
                {editMode ? (
                    <CategoryEditSection
                        {...{
                            categoryName,
                            onChangeInput,
                            setEditMode,
                            handleSubmit,
                        }}
                    />
                ) : (
                    <Grid
                        item
                        xs={1}
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <Button
                            onClick={() => emitOnEdit(node.id)}
                            sx={{
                                color: 'text.secondary',
                            }}
                        >
                            <ModeEditIcon />
                        </Button>
                        <Button
                            onClick={() => onDelete(node.id)}
                            sx={{
                                color: 'text.secondary',
                            }}
                        >
                            <DeleteIcon />
                        </Button>
                    </Grid>
                )}
            </Grid>
        );
    },
);

/**
 * 본 컴포넌트는 MUI 용 react-dnd 예제를 참고한 것입니다.
 * 기본적으로 동적 컴포넌트 사용 없이도 서버 사이드 렌더링에서 잘 동작합니다.
 * 하지만 혹시 모를 문제를 방지하기 위해, 동적 컴포넌트(`코드 스플릿팅`) 사용을 염두에 두었고,
 * 이를 위해 한 파일에 모든 컴포넌트를 정의하였습니다.
 *
 * [링크](https://codesandbox.io/s/add-remove-duplicate-ts-8q20pd?from-embed=&file=/package.json:212-238)
 *
 * 본 코드는 위 링크에서 대부분을 가져온 것입니다.
 */
export const CategoryTreeEditor = observer(() => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const categoryService = useCategoryService();
    const [treeData, setTreeData] = useState<CategoryTreeModel>([]);
    const [mounted, setMounted] = useState<boolean>(false);

    /**
     * 카테고리를 불러옵니다.
     */
    const initCategoryList = useCallback(async () => {
        const res: AxiosResponse<any> = await axios.get(
            `${API_URL}/admin/category?isBeautify=true`,
            {},
        );

        const categories: CategoryDepthVO[] = res.data.data;

        // 몹엑스와 연동
        categoryService.setCategories(categories);
    }, []);

    /**
     * 카테고리를 획득합니다.
     */
    const getFlatCategories = useCallback(() => {
        const raw = toJS(categoryService.getCategories());
        let resultData: CategoryResultTuple[] = [];
        const nodeItems: NodeModel[] = [];

        const convertWithData = (data: CategoryDepthVO[]) => {
            const result: CategoryResultTuple[] = [];

            const convertRecursive = (
                data: CategoryDepthVO[],
                parent: CategoryDepthVO | null,
            ) => {
                data.forEach(item => {
                    const node = [
                        item,
                        parent ?? null,
                        item.depth,
                    ] as CategoryResultTuple;
                    result.push(node);
                    if (item.children) {
                        convertRecursive(item.children, item);
                    }
                }, this);
            };
            convertRecursive(data, null);

            return result;
        };

        resultData = convertWithData(raw);

        return { flatCategories: resultData, nodeItems };
    }, []);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, [open]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [open]);

    /**
     * 노드 삭제
     */
    const handleDelete: CategoryNodeEventHandler = id => {
        const deleteIds = [
            id,
            ...getDescendants(treeData, id).map(node => node.id),
        ];

        const copiedNodes = treeData.filter(
            node => !deleteIds.includes(node.id),
        );

        setTreeData([...copiedNodes]);
    };

    const handleEdit: CategoryNodeEditEventHandler = async (
        id,
        newCategoryName,
    ) => {
        const prevNoode = treeData.find(e => e.id === id);

        if (prevNoode) {
            const copiedNodes = treeData.map(node => {
                if (node.id === id) {
                    node.text = newCategoryName;
                }
                return node;
            });

            setTreeData([...copiedNodes]);

            const res = await axios.patch(`${API_URL}/admin/category/${id}`, {
                categoryName: newCategoryName,
            });

            if (res.data.result === 'success') {
                toast.info('카테고리 명이 변경되었습니다.', {
                    position: 'top-center',
                });
            }
        }
    };

    const getLastId = useCallback(
        (treeData: NodeModel[]) => {
            const reversedArray = [...treeData].sort((a, b) => {
                if (a.id < b.id) {
                    return 1;
                } else if (a.id > b.id) {
                    return -1;
                }

                return 0;
            });

            if (reversedArray.length > 0) {
                return reversedArray[0].id;
            }

            return 0;
        },
        [treeData],
    );

    const handleCopy: CategoryNodeEventHandler = id => {
        const lastId = getLastId(treeData) as number;
        const targetNode = treeData.find(node => node.id === id);

        const descendants = getDescendants(treeData, id);
        const partialTree = descendants.map(node => ({
            ...node,
            id: (node.id as number) + lastId,
            parent: (node.parent as number) + lastId,
        }));

        setTreeData([
            ...treeData,
            {
                ...targetNode,
                id: targetNode.id + lastId,
            },
            ...partialTree,
        ]);
    };

    const handleDrop = useCallback(
        (newTree: NodeModel<CategoryModel>[]) => setTreeData(newTree),
        [],
    );

    /**
     * 메인 페이지로 돌아가기
     */
    const returnToManagePage = useCallback(() => {
        router.push(URL_MAP.MANAGE);
    }, [router]);

    /**
     * 드래그 도중에 표시될 컴포넌트
     *
     * @param monitorProps
     * @returns
     */
    const dragPreviewRender = (
        monitorProps: DragLayerMonitorProps<CategoryModel>,
    ) => {
        return DragPreview({ monitorProps });
    };

    const init = async () => {
        await initCategoryList();
        const { flatCategories } = getFlatCategories();

        const nodeItems: NodeModel[] = [];

        flatCategories.forEach(([category, parent, depth]) => {
            nodeItems.push({
                id: category.id,
                parent: parent ? parent.id : 0,
                droppable: category.children.length > 0,
                text: category.name,
                data: {
                    depth,
                },
            });
        });

        setTreeData([...nodeItems]);
        setMounted(true);
    };

    useEffect(() => {
        if (!mounted) {
            init();
        }
    }, [mounted]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CategoryEditorHeader {...{ returnToManagePage }} />

            <CategoryAddDialog open={open} onClose={handleClose} />
            <Box
                sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    padding: 2,
                }}
            >
                <DndProvider
                    backend={MultiBackend}
                    options={getBackendOptions()}
                >
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                mb: 2,
                            }}
                        >
                            <Button
                                onClick={handleOpen}
                                startIcon={<AddIcon />}
                                sx={{
                                    color: 'text.secondary',
                                    mb: 1,
                                }}
                                variant="outlined"
                            >
                                새로운 카테고리 추가
                            </Button>
                            <Divider />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: 1,
                                p: 2,
                                m: 1,
                            }}
                        >
                            <Tree
                                tree={treeData}
                                rootId={0}
                                render={(
                                    node: NodeModel<CategoryTreeModel>,
                                    options,
                                ) => (
                                    <CategoryNode
                                        node={node}
                                        {...options}
                                        onDelete={handleDelete}
                                        onCopy={handleCopy}
                                        onEdit={handleEdit}
                                    />
                                )}
                                dragPreviewRender={dragPreviewRender}
                                onDrop={handleDrop}
                            />
                        </Grid>
                    </Grid>
                </DndProvider>
            </Box>
        </ThemeProvider>
    );
});
