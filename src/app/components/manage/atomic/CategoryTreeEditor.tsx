import {
    Button,
    Select,
    TextField,
    MenuItem,
    FormControl,
    FormControlLabel,
    InputLabel,
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
    Modal,
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
} from '@minoru/react-dnd-treeview';
import AddIcon from '@mui/icons-material/Add';
import CopyIcon from '@mui/icons-material/FileCopy';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { URL_MAP } from '@/common/URL';
import { toJS } from 'mobx';
import { CategoryDepthVO } from '@/services/CategoryService';
import { useCategoryService } from '@/hooks/useCategoryService';
import { API_URL } from '@/app/api/request';
import axios, { AxiosResponse } from 'axios';

/**
 * 본 컴포넌트는 MUI 용 react-dnd 예제를 참고한 것입니다.
 * 클라이언트 사이드 렌더링을 위해 동적 컴포넌트로 불러와야 합니다.
 *
 * @link https://codesandbox.io/s/add-remove-duplicate-ts-8q20pd?from-embed=&file=/package.json:212-238
 */
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

type CategoryNodeEventHandler = (id: NodeModel['id']) => void;
type CategoryModel = {
    id: string;
};

export interface CategoryNodeProps<T> {
    node: NodeModel<T>;
    depth: number;
    isOpen: boolean;
    onToggle: CategoryNodeEventHandler;
    onDelete: CategoryNodeEventHandler;
    onCopy: CategoryNodeEventHandler;
    onEdit: CategoryNodeEventHandler;
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
        const handleToggle = useCallback(() => {
            onToggle(node.id);
        }, [node.id, onToggle]);

        if (node.droppable) {
            return (
                <Grid
                    container
                    spacing={1}
                    sx={{
                        background: 'rgba(0, 0, 0, 0.02)',
                        mb: 2,
                    }}
                >
                    <Grid item pl={depth * 2}>
                        <Button
                            variant="outlined"
                            onClick={handleToggle}
                            sx={{
                                color: 'text.secondary',
                            }}
                        >
                            {node.text}
                        </Button>
                    </Grid>
                </Grid>
            );
        }

        return (
            <Grid
                container
                spacing={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pl: depth * 2,
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        m: 1,
                    }}
                >
                    {node.text}
                </Button>
                <Button onClick={() => onEdit(node.id)}>
                    <ModeEditIcon />
                </Button>
                <Button onClick={() => onDelete(node.id)}>
                    <DeleteIcon />
                </Button>
            </Grid>
        );
    },
);

interface FreeNodeModel extends NodeModel<Pick<CategoryDepthVO, 'depth'>> {
    id: number;
    parent: number;
}

interface AddNodeFormProps {
    categoryName: string;
    rootNodeName: string;
}
export const CategoryAddDialog = observer(
    ({ open, onClose }: { open: boolean; onClose: () => void }) => {
        const categoryService = useCategoryService();
        const [categoryName, setCategoryName] = useState('');
        const [rootCategoryId, setRootCategoryId] = useState<string>('');
        const [categoryNames, setCategoryNames] = useState<string[]>(['']);

        useEffect(() => {
            const names = [] as string[];
            const getCategoryName = (category: CategoryDepthVO) => {
                if (!category) {
                    return;
                }
                names.push(category.name);

                if (category.children) {
                    category.children.forEach(child => {
                        getCategoryName(child);
                    });
                }
            };

            getCategoryName(categoryService.getCategories()[0]);
            setCategoryNames([...names]);
        }, [categoryService]);

        const handleSubmit = async () => {
            const res = await axios.post<AddNodeFormProps>(
                `${API_URL}/admin/category`,
                {
                    categoryName,
                    rootNodeName: rootCategoryId,
                },
            );

            if ([200, 201].includes(res.status)) {
                onClose();
            }
        };

        return (
            <Modal open={open}>
                <Box
                    sx={{
                        background: 'white',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <TextField
                                label="카테고리명"
                                variant="outlined"
                                sx={{
                                    width: '100%',
                                }}
                                value={categoryName}
                                onChange={e => setCategoryName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                fullWidth
                                sx={{
                                    width: '100%',
                                }}
                            >
                                <InputLabel id="root-category-select-label">
                                    상위 카테고리
                                </InputLabel>
                                <Select
                                    label="상위 카테고리"
                                    labelId="root-category-select-label"
                                    value={rootCategoryId}
                                    onChange={e => {
                                        setRootCategoryId(e.target.value);
                                    }}
                                >
                                    {categoryNames.map(e => {
                                        return (
                                            <MenuItem
                                                value={e}
                                                key={`root-category-${e}`}
                                            >
                                                {e}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            gap={2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button variant="contained" onClick={handleSubmit}>
                                추가
                            </Button>
                            <Button variant="contained" onClick={onClose}>
                                닫기
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        );
    },
);

export type CategoryTreeModel = FreeNodeModel[] | any;

export const CategoryTreeEditor = observer(() => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const categoryService = useCategoryService();
    const [treeData, setTreeData] = useState<CategoryTreeModel>([]);
    const [mounted, setMounted] = useState<boolean>(false);

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
        let resultData: [CategoryDepthVO, CategoryDepthVO | null, number][] =
            [];
        const nodeItems: NodeModel[] = [];

        const convertWithData = (data: CategoryDepthVO[]) => {
            const result: [CategoryDepthVO, CategoryDepthVO | null, number][] =
                [];

            const convertRecursive = (
                data: CategoryDepthVO[],
                parent: CategoryDepthVO | null,
            ) => {
                data.forEach(item => {
                    const node = [item, parent ?? null, item.depth] as [
                        CategoryDepthVO,
                        CategoryDepthVO | null,
                        number,
                    ];
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

    const handleEdit: CategoryNodeEventHandler = id => {};

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
        return <Button variant="contained">{monitorProps.item.text}</Button>;
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
            <Grid container spacing={0} marginBottom={2}>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={returnToManagePage}>
                        관리자 페이지 메인으로
                    </Button>
                </Grid>
            </Grid>
            <CategoryAddDialog open={open} onClose={handleClose} />
            <Box>
                <DndProvider
                    backend={MultiBackend}
                    options={getBackendOptions()}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button
                                onClick={handleOpen}
                                startIcon={<AddIcon />}
                            >
                                노드 추가
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
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
