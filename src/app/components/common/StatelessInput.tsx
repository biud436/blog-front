import {
    FormControl,
    Grid,
    InputLabel,
    OutlinedInput,
    OutlinedInputProps,
} from '@mui/material';

export const StatelessInput = ({
    forwardedRef,
    ...props
}: OutlinedInputProps & {
    forwardedRef?: React.RefObject<HTMLInputElement>;
}) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) props.onChange(e);

        if (forwardedRef?.current) {
            forwardedRef.current.value = e.target.value;
        }
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
                    <OutlinedInput
                        {...props}
                        ref={forwardedRef}
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
