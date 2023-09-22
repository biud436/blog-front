import { Button, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { SxProps, Theme } from '@mui/material/styles';
import { NodeModel } from '@minoru/react-dnd-treeview';
import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import React, { useCallback, useMemo, useState } from 'react';

import { CategoryEditSection } from './CategoryEditSection';
import {
    CategoryNodeEventHandler,
    CategoryNodeEditEventHandler,
    CategoryModel,
} from './CategoryTypes';
import { CategoryNodeHandler } from './CategoryNodeHandler';

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
        const handleToggle = useCallback(
            (e: React.MouseEvent) => {
                e.preventDefault();
                onToggle(node.id);
            },
            [node.id, onToggle],
        );

        const emitOnEdit = useCallback(() => {
            setEditMode(true);
        }, [onEdit]);

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
                <Grid container spacing={0} sx={categoryNodeProp}>
                    {!editMode && (
                        <Grid
                            item
                            pl={depth * 2}
                            xs={11}
                            onClick={handleToggle}
                        >
                            <Button
                                variant="text"
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover': {
                                        color: 'text.primary',
                                    },
                                }}
                                startIcon={
                                    isOpen ? <ArrowDropDown /> : <ArrowRight />
                                }
                            >
                                {node.text}
                            </Button>
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
                        <CategoryNodeHandler
                            {...{ emitOnEdit, node, onDelete }}
                        />
                    )}
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
                    <CategoryNodeHandler {...{ emitOnEdit, node, onDelete }} />
                )}
            </Grid>
        );
    },
);
