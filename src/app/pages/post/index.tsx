import { PageWrapper } from '@/layouts/PageWrapper';
import { URL_MAP } from '@/common/URL';
import { usePost } from '@/hooks/usePost';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { PostPresent } from '../../components/post/PostPresent';

export const PostPage = observer(() => {
    const params = useParams();
    const { postId } = params;
    const { post, error } = usePost(+postId!);
    const [thumbnail, setThumbnail] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            navigate('/404');
            toast.error(error.message, {
                position: 'top-center',
            });
        }

        if (post && post.images && post.images.length > 0) {
            setThumbnail(post.images[0].path);
        }
    }, [post, error]);

    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(URL_MAP.MAIN);
        }
    };

    return (
        <PageWrapper name={post.title}>
            <Helmet>
                <title>{post.title}</title>
                <meta name="referrer" content="unsafe-url"></meta>
                <meta property="og:site_name" content={post.title} />
                <meta property="og:title" content={post.title} />"
                <meta property="og:type" content="article" />
                <meta
                    property="og:article:author"
                    content={post.user?.profile?.nickname}
                />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content={thumbnail} />
                <meta property="og:image:witdh" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:description" content={post.content} />
            </Helmet>
            <PostPresent post={post} goBack={goBack} />
        </PageWrapper>
    );
});
