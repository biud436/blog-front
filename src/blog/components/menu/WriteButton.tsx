import * as React from 'react';
import Typography from '@mui/material/Typography';
import { URL_MAP } from '@/common/URL';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import CreateIcon from '@mui/icons-material/Create';

export const WriteButton = React.memo(() => {
    const router = useRouter();

    return (
        <Button
            color="inherit"
            onClick={() => router.push(URL_MAP.POST_EDIT)}
            startIcon={<CreateIcon />}
        >
            <Typography
                variant="button"
                sx={{
                    color: {
                        xs: 'white',
                        sm: 'white',
                        md: 'white',
                        lg: '#1e1e1e',
                        xl: '#1e1e1e',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                글쓰기
            </Typography>
        </Button>
    );
});
