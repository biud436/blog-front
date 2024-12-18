import React from 'react';
import { PostsPage } from '@/components/pages/posts';

export const metadata = {
    title: '어진석의 블로그',
    description: '블로그',
};

export default function MyMain() {
    return <PostsPage />;
}
