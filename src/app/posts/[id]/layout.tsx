'use client';

import React from 'react';
import { MainLayout } from '@/layouts/BlogMainLayout';
import { PostServiceProvider } from '@/services/PostService';

interface PostLayoutProps {
    children: React.ReactNode;
}

export default function PostLayout({ children }: PostLayoutProps) {
    return (
        <PostServiceProvider>
            <MainLayout name={''}>{children}</MainLayout>
        </PostServiceProvider>
    );
}
