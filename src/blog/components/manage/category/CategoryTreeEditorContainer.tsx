import {
    Button,
    ThemeProvider,
    CssBaseline,
    Grid,
    Box,
    Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { createTheme } from '@mui/material/styles';
import { DndProvider } from 'react-dnd';
import {
    Tree,
    MultiBackend,
    DragLayerMonitorProps,
    getDescendants,
    getBackendOptions,
    NodeModel,
    DropOptions,
} from '@minoru/react-dnd-treeview';
import AddIcon from '@mui/icons-material/Add';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { URL_MAP } from '@/common/URL';
import { toJS } from 'mobx';
import { CategoryDepthVO } from '@/services/CategoryService';
import { useCategoryService } from '@/hooks/useCategoryService';
import { API_URL } from '@/blog/api/request';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { CategoryAddDialog } from './CategoryAddDialog';
import {
    CategoryNodeEventHandler,
    CategoryNodeEditEventHandler,
    CategoryModel,
    CategoryResultTuple,
    CategoryTreeModel,
    MoveCategoryDto,
} from './CategoryTypes';
import { DragPreview } from './DragPreview';
import { CategoryEditorHeader } from './CategoryEditorHeader';
import { CategoryNode } from './CategoryNode';
import { ServerResponse } from '@/types/ServerResponse';

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

export const CategoryTreeEditorContainer = observer(() => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const categoryService = useCategoryService();
    const [treeData, setTreeData] = useState<CategoryTreeModel>([]);
    const [mounted, setMounted] = useState<boolean>(false);

    /**
     * 카테고리를 불러옵니다.
     */
    const initCategoryList = useCallback(async () => {
        const res: AxiosResponse<ServerResponse<CategoryDepthVO[]>> =
            await axios.get(`${API_URL}/admin/category?isBeautify=true`, {});

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

    const handleCopy: CategoryNodeEventHandler = useCallback(
        id => {
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
        },
        [treeData],
    );

    const handleDrop = useCallback<
        (
            tree: NodeModel<CategoryModel>[],
            options?: DropOptions | undefined,
        ) => void
    >(
        (
            newTree: NodeModel<CategoryModel>[],
            options: DropOptions | undefined,
        ) => {
            console.log(newTree);
            console.log(options);

            if (options) {
                const {
                    dragSourceId: prevCategoryId,
                    dropTargetId: newCategoryParentId,
                } = options;

                const dto: MoveCategoryDto = {
                    newCategoryParentId: +newCategoryParentId,
                };

                axios
                    .post(
                        `${API_URL}/admin/category/${prevCategoryId}/move`,
                        dto,
                    )
                    .then(res => {
                        const { data, result } = res.data;

                        if (result === 'success' && data.success) {
                            toast.info('카테고리가 이동되었습니다.', {
                                position: 'top-center',
                            });
                        } else {
                            toast.error('카테고리 이동에 실패했습니다.', {
                                position: 'top-center',
                            });
                        }
                    })
                    .catch(() => {
                        toast.error('카테고리 이동에 실패했습니다.', {
                            position: 'top-center',
                        });
                    });
            }

            setTreeData(newTree);
        },
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
                droppable: true,
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
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 2,
                                m: 1,
                                border: '1px solid #e0e0e0',
                                borderLeft: '5px solid #1976d2',
                                borderRadius: 3,
                                boxShadow: 1,
                            }}
                        >
                            <Typography variant="h6">카테고리 편집</Typography>
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
