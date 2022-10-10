import { PageWrapper } from '@/app/components/PageWrapper';
import { observer } from 'mobx-react-lite';
import { PostsPresent } from '../../components/PostsPresent';

export const PostsPage = observer(() => {
    return (
        <PageWrapper name="포스트 목록">
            <PostsPresent />
        </PageWrapper>
    );
});
