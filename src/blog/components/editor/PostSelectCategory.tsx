import { CategoryDepthVO } from '@/services/CategoryService';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

export function PostSelectCategory({
    currentCategoryId,
    setCurrentCategoryId,
    categories,
}: {
    currentCategoryId: number;
    setCurrentCategoryId: React.Dispatch<React.SetStateAction<number>>;
    categories: CategoryDepthVO[];
}) {
    return (
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>카테고리 선택</InputLabel>
            <Select
                value={currentCategoryId}
                label="카테고리 선택"
                onChange={e => setCurrentCategoryId(+e.target.value)}
            >
                <MenuItem value={0} key="post_select_category_0">
                    ---
                </MenuItem>
                {categories.map(category => {
                    return (
                        <MenuItem
                            value={category.id}
                            key={'post_select_category_' + category.id}
                        >
                            {[...Array(category.depth)].map((e, index) => {
                                return (
                                    <React.Fragment key={`${e}.${index}`}>
                                        &nbsp;&nbsp;
                                    </React.Fragment>
                                );
                            })}
                            {category.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
