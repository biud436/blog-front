import React from 'react';
import { PostEditorContainer } from '@/blog/pages/editor';
import { useRouter } from 'next/router';

export default function Editor() {
    const router = useRouter();
    const { mode } = router.query;

    return <PostEditorContainer editorMode={mode as string} />;
}
