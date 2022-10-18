import { FormControl, Input, InputLabel } from '@mui/material';
import React from 'react';

export function PostTitleInput({
    title,
    setTitle,
}: {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
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
    );
}
