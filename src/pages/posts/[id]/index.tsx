import { PostPage } from '@/app/pages/post';
import { useRouter } from 'next/router';

export default function Posts() {
    const router = useRouter();

    return <PostPage />;
}
