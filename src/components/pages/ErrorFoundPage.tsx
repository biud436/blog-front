import React from 'react';
import { MainLayout } from '@/layouts/BlogMainLayout';
import { Alert } from '@mui/material';
import { Meta } from '@/components/common/utils/Meta';

interface ErrorComponentProps {
  message: string;
  statusCode: number;
}

export const ErrorComponent = (props: ErrorComponentProps) => {
  return (
    <MainLayout name={`오류 페이지 - ${props.statusCode}`}>
      <Meta title="오류 페이지" description="오류 페이지" />
      <Alert severity="error">
        {props.message ?? '알 수 없는 오류입니다.'}
      </Alert>
    </MainLayout>
  );
};
