import { OutlinedInput, OutlinedInputProps } from '@mui/material';

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
        <OutlinedInput
            {...props}
            ref={forwardedRef}
            value={forwardedRef?.current?.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        />
    );
};
