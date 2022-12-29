import { Button } from '@mui/material';
import React from 'react';

export interface HeaderIconButtonProps {
    startIcon: React.ReactNode;
    href: string;
}

export const HeaderIconButton = React.memo(
    ({ startIcon, href }: HeaderIconButtonProps) => {
        return (
            <Button
                startIcon={startIcon}
                LinkComponent="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    color: 'text.secondary',
                }}
            />
        );
    },
);
