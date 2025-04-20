import React from 'react';
import { MainLayout } from '@/layouts/BlogMainLayout';
import { Alert } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <MainLayout name="페이지 오류">
      <Alert severity="error">Page Not Found</Alert>
    </MainLayout>
  );
};
