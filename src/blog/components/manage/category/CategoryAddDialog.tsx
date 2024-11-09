import {
  Button,
  Select,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Box,
  Modal,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { useCategoryService } from '@/hooks/services/useCategoryService';
import { API_URL } from '@/blog/api/request';
import axios from 'axios';
import { AddNodeFormProps } from './CategoryTypes';

interface CategoryAddDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CategoryAddDialog = observer(
  ({ open, onClose }: CategoryAddDialogProps) => {
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

    const handleSubmit = useCallback(async () => {
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
    }, [categoryName, rootCategoryId]);

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
                      <MenuItem value={e} key={`root-category-${e}`}>
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
