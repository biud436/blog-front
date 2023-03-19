import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import React from 'react';

export const CenterFlexBox = observer(
    ({ children }: { children: React.ReactNode[] }) => {
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
    },
);
