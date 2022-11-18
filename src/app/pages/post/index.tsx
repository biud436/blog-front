import { PageWrapper } from '@/layouts/PageWrapper';
import { URL_MAP } from '@/common/URL';
import { usePost } from '@/hooks/usePost';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { PostPresent } from '../../components/post/PostPresent';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Post } from '@/store/post';
import { PostsProps } from '@/pages/posts/[id]';

export const PostPage = observer(({ post, error, id: postId }: PostsProps) => {
    const router = useRouter();

    const [thumbnail, setThumbnail] = useState<string>('');
    const [postUrl, setPostUrl] = useState('');

    useEffect(() => {
        if (error) {
            router.push('/404');
            toast.error(error.message, {
                position: 'top-center',
            });
        }

        if (post && post.images && post.images.length > 0) {
            setThumbnail(post.images[0].path);
        }

        setPostUrl(`https://blog.biud436.com/posts/${postId}`);
    }, [post, error]);

    const goBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push(URL_MAP.MAIN);
        }
    };

    return (
        <PageWrapper name={post.title}>
            <Head>
                <title>
                    {postId} - {post.title}
                </title>
                <meta name="referrer" content="unsafe-url"></meta>
                <meta property="og:site_name" content={post.title} />
                <meta property="og:title" content={post.title} />"
                <meta
                    property="og:article:author"
                    content={post.user?.profile?.nickname}
                />
                <meta property="og:url" content={postUrl} />
                <meta property="og:image" content={thumbnail} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:type" content="blog" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="og:description" content={post.content} />
            </Head>
            <PostPresent post={post} goBack={goBack} />
        </PageWrapper>
    );
});
