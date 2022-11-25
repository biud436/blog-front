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
import { useCallback, useState } from 'react';

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
}

export const CategoryNode = observer(
    ({
        node,
        depth,
        isOpen,
        onToggle,
        onDelete,
        onCopy,
    }: CategoryNodeProps<CategoryModel>) => {
        return <div>{node.text}</div>;
    },
);

export const CategoryTreeEditor = observer(() => {
    const [open, setOpen] = useState<boolean>(false);
    const [sampleData, setSampleData] = useState<any[]>(() => {
        return [
            {
                id: 1,
                parent: 0,
                droppable: true,
                text: 'Folder 1',
            },
            {
                id: 2,
                parent: 1,
                droppable: false,
                text: 'File 1-1',
                data: {
                    fileType: 'csv',
                },
            },
            {
                id: 3,
                parent: 1,
                droppable: false,
                text: 'File 1-2',
                data: {
                    fileType: 'text',
                },
            },
            {
                id: 4,
                parent: 0,
                droppable: true,
                text: 'Folder 2',
            },
            {
                id: 5,
                parent: 4,
                droppable: true,
                text: 'Folder 2-1',
            },
            {
                id: 6,
                parent: 5,
                droppable: false,
                text: 'File 2-1-1',
                data: {
                    fileType: 'image',
                },
            },
            {
                id: 7,
                parent: 0,
                droppable: false,
                text: 'File 3',
                data: {
                    fileType: 'image',
                },
            },
        ];
    });

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, [open]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [open]);

    const handleDelete: CategoryNodeEventHandler = id => {
        const deleteIds = [
            id,
            ...getDescendants(sampleData, id).map(node => node.id),
        ];

        const copiedNodes = sampleData.filter(
            node => !deleteIds.includes(node.id),
        );

        setSampleData([...copiedNodes]);
    };

    const getLastId = useCallback(
        (treeData: NodeModel[]) => {
            const reversedArray = [...sampleData].sort((a, b) => {
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
        [sampleData],
    );

    const handleCopy: CategoryNodeEventHandler = id => {
        const lastId = getLastId(sampleData);
        const targetNode = sampleData.find(node => node.id === id);

        const descendants = getDescendants(sampleData, id);
        const partialTree = descendants.map(node => ({
            ...node,
            id: node.id + lastId,
            parent: node.parent + lastId,
        }));

        setSampleData([
            ...sampleData,
            {
                ...targetNode,
                id: targetNode.id + lastId,
            },
            ...partialTree,
        ]);
    };

    const handleDrop = useCallback(
        (newTree: NodeModel<CategoryModel>[]) => setSampleData(newTree),
        [],
    );

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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Button onClick={handleOpen} startIcon={<AddIcon />}>
                            노드 추가
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Tree
                            tree={sampleData}
                            rootId={0}
                            render={(node: NodeModel<any>, options) => (
                                <CategoryNode
                                    node={node}
                                    {...options}
                                    onDelete={handleDelete}
                                    onCopy={handleCopy}
                                />
                            )}
                            dragPreviewRender={dragPreviewRender}
                            onDrop={handleDrop}
                        />
                    </Grid>
                </Grid>
            </DndProvider>
        </ThemeProvider>
    );
});
