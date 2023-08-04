import React from 'react';
import { observer } from 'mobx-react-lite';
import { PostsPresent } from '../blog/components/posts/PostsPresent';

export const PostsContainer = observer(() => {
    return <PostsPresent />;
});
