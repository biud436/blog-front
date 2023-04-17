import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Input,
    InputLabel,
} from '@mui/material';
import React from 'react';

export interface PostTitleInputProps {
    title: string;
    setTitle: (title: string) => void;
}

export function PostTitleInput({ title, setTitle }: PostTitleInputProps) {
    return (
        <FormControl
            fullWidth
            sx={{ marginBottom: 0 }}
            className={'p-2 hover:bg-gray-100'}
        >
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
