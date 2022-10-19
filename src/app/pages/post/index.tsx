import { PageWrapper } from '@/app/components/category/PageWrapper';
import { URL_MAP } from '@/common/URL';
import { usePost } from '@/hooks/usePost';
import { PostContext, PostServiceProvider } from '@/services/PostService';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { PostPresent } from '../../components/post/PostPresent';

export const PostPage = observer(() => {
    const params = useParams();
    const { postId } = params;
    const { post, error } = usePost(+postId!);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            navigate('/404');
            toast.error(error.message, {
                position: 'top-center',
            });
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
                <Helmet>
                    <title>{post.title}</title>
                    <meta property="og:title" content={post.title} />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={window.location.href} />
                    <meta property="og:description" content={post.content} />
                </Helmet>
            </Helmet>
            <PostPresent post={post} goBack={goBack} />
        </PageWrapper>
    );
});
