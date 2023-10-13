import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import React from 'react';

interface CenterFlexBoxProps {
    children: React.ReactNode[];
}

export const CenterFlexBox = observer(({ children }: CenterFlexBoxProps) => {
    return (
        <Box
            sx={{
                display: {
                    xs: 'flex',
                    sm: 'flex',
                    md: 'flex',
                },
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
            }}
        >
            {children}
        </Box>
    );
});
