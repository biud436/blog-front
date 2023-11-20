import React from 'react';
import { MainLayout } from '@/layouts/BlogMainLayout';

export default function HelloLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <MainLayout name="Hello">
            <>{children}</>
        </MainLayout>
    );
}
