'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { PostsPresent } from '../post/list/PostsPresent';

export const PostsContainer = observer(() => {
    return <PostsPresent />;
});
