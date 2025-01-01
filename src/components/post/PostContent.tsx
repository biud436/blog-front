'use client';
import React from 'react';
import { Post } from '@/models/Post';
import { Grid2 as Grid } from '@mui/material';

import dynamic from 'next/dynamic';

const Viewer = dynamic(
  async () => {
    const [mod] = await Promise.all([import('./viewer/TuiEditorViewer')]);

    return mod.default;
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-4 m-4 text-lg rounded-md bg-gray-50">
        로딩중...
      </div>
    ),
  },
);

export type PostContentProps = {
  post: Post;
};

export function PostContent({ post }: PostContentProps) {
  return (
    <Grid size={{ xs: 12 }}>
      <Viewer content={post.content} />
    </Grid>
  );
}
