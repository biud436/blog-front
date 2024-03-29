'use client';

import React from 'react';
import { PostEditorContainer } from '@/containers/PostEditorContainer';
import { useSearchParams } from 'next/navigation';

export default function Editor() {
    const searchParams = useSearchParams();
    const mode = searchParams?.get('mode');

    return <PostEditorContainer editorMode={mode as string} />;
}
