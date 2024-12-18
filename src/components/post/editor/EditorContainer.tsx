'use client';

import React from 'react';
import { PostEditorContainer } from '@/components/pages/PostEditorContainer';
import { useSearchParams } from 'next/navigation';

export function EditorContainer() {
  const searchParams = useSearchParams();
  const mode = searchParams?.get('mode');

  return <PostEditorContainer editorMode={mode as string} />;
}
