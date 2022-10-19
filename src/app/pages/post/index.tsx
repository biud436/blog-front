import { PageWrapper } from '@/app/components/category/PageWrapper';
import { usePost } from '@/hooks/usePost';
import { PostContext, PostServiceProvider } from '@/services/PostService';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
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
        navigate(-1);
    };

    return (
        <PageWrapper name={post.title}>
            <PostPresent post={post} goBack={goBack} />
        </PageWrapper>
    );
});
