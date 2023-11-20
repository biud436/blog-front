'use client';

import React from 'react';
import { PostsPage } from '@/blog/pages/posts';
import { observer } from 'mobx-react-lite';

const MyMain = observer(() => {
    return <PostsPage />;
});

export default MyMain;
