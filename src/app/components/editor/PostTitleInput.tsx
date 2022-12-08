import { FormControl, Input, InputLabel } from '@mui/material';
import React from 'react';
import { useController, UseFormSetValue } from 'react-hook-form';

export interface PostTitleInputProps {
    title: string;
    setTitle: (title: string) => void;
}

export function PostTitleInput({ title, setTitle }: PostTitleInputProps) {
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
