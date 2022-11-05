import { PageWrapper } from '@/layouts/PageWrapper';
import { observer } from 'mobx-react-lite';
import { PostsPresent } from '../../components/posts/PostsPresent';

export const PostsPage = observer(() => {
    return (
        <PageWrapper name="어진석의 블로그">
            <PostsPresent />
        </PageWrapper>
    );
});
