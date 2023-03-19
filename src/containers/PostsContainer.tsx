import React from 'react';
import { PostsServiceProvider } from '@/services/PostsService';
import { observer } from 'mobx-react-lite';
import {
    PageHeader,
    PageDescription,
    PostsPresent,
} from '../blog/components/posts/PostsPresent';

export const PostsContainer = observer(() => {
    return (
        <>
            <PostsServiceProvider>
                <PageHeader />
                <PageDescription />
                <PostsPresent />
            </PostsServiceProvider>
        </>
    );
});
