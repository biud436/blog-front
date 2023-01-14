import { EditPageProps, PostEditorContainer } from '@/blog/pages/editor';
import { Post } from '@/store/post';
import axios from 'axios';
import { GetServerSidePropsContext, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Editor() {
    const router = useRouter();
    const { mode } = router.query;

    return <PostEditorContainer editorMode={mode as string} />;
}
