import React from 'react';
import { MainLayout } from '@/layouts/BlogMainLayout';
import { Alert } from '@mui/material';
import { observer } from 'mobx-react-lite';

export const NotFoundPage = observer(() => {
    return (
        <MainLayout name="페이지 오류">
            <Alert severity="error">페이지를 찾을 수 없습니다.</Alert>
        </MainLayout>
    );
});
