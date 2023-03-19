import React from 'react';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { observer } from 'mobx-react-lite';

export const RefreshButton = observer(
    ({ fetchData }: { fetchData: () => Promise<void> }) => {
        return (
            <Button
                startIcon={<RefreshIcon />}
                onClick={() => fetchData()}
                variant="outlined"
                color="success"
            >
                새로고침
            </Button>
        );
    },
);
