import { EditPageProps, PostEditorContainer } from '@/app/pages/editor';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Editor() {
    const { query } = useRouter();
    const { mode } = query;

    return <PostEditorContainer editorMode={mode as string} />;
}
