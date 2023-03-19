import { TextField, TextFieldProps } from '@mui/material';
import {
    FieldPath,
    FieldValues,
    useController,
    UseControllerProps,
} from 'react-hook-form';
import React from 'react';

export type CustomInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = TextFieldProps & UseControllerProps<TFieldValues, TName>;

export function CustomMUIInput(props: CustomInputProps) {
    const {
        field,
        fieldState: { error },
    } = useController(props);

    return (
        <TextField
            {...props}
            {...field}
            error={!!error}
            helperText={error?.message}
        />
    );
}
