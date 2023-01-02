import { useStatelessInput } from '@/hooks/useStatelessInput';
import { Button, Grid, Input } from '@mui/material';
import React from 'react';

export function CategoryEditSection({
    categoryName,
    onChangeInput,
    setEditMode,
    handleSubmit,
}: {
    categoryName: string;
    onChangeInput: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: () => void;
}) {
    console.log('마우스가 나가거나 들어올 때마다 렌더링이 되는지 확인');

    return (
        <Grid
            item
            gap={2}
            xs={12}
            sx={{
                display: 'flex',

                justifyContent: 'space-between',
                p: 2,
            }}
        >
            <Input
                value={categoryName}
                onChange={onChangeInput}
                sx={{
                    mr: 1,
                }}
            />

            <Grid container>
                <Button variant="text" onClick={() => setEditMode(false)}>
                    취소
                </Button>
                <Button variant="text" onClick={handleSubmit}>
                    확인
                </Button>
            </Grid>
        </Grid>
    );
}
