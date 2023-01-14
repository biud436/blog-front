import {
    FormControl,
    Grid,
    InputLabel,
    OutlinedInput,
    OutlinedInputProps,
} from '@mui/material';
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

export const StatelessInput = ({
    forwardedRef,
    ...props
}: OutlinedInputProps & {
    initialValue?: () => string | undefined;
    forwardedRef?: React.RefObject<HTMLInputElement>;
}) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) props.onChange(e);

        if (forwardedRef?.current) {
            forwardedRef.current.value = e.target.value;
        }
    };

    const onRefChange = useCallback(node => {
        if (node === null) {
        } else {
            if (forwardedRef) {
                const inputElem = node.childNodes[0];
                (forwardedRef.current as HTMLInputElement) = inputElem;

                forwardedRef.current!.value = props.initialValue?.() ?? '';
            }
        }
    }, []);

    return (
        <Grid container>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
                    <OutlinedInput
                        {...props}
                        ref={onRefChange}
                        fullWidth
                        id={props.id}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(e)
                        }
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
};
