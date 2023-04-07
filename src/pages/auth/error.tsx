import React from 'react';
import { useRouter } from 'next/router';
import { Alert, Container } from '@mui/material';

export default function AuthError() {
    // ?error= 를 통해 에러 메시지를 받아온다.
    const router = useRouter();
    const { error } = router.query;

    return (
        <Container>
            <Alert severity="error">{error}</Alert>
        </Container>
    );
}
