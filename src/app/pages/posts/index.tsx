import { PageWrapper } from '@/layouts/PageWrapper';
import { observer } from 'mobx-react-lite';
import { PostsPresent } from '../../components/posts/PostsPresent';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Meta } from '@/app/components/utils/Meta';
import { GlobalStyle } from '@/styles/global-styles';

export const PostsPage = observer(() => {
    return (
        <PageWrapper name="어진석의 블로그">
            <Meta
                {...{ title: '포스트 목록', description: '포스트 목록입니다' }}
            />
            <GlobalStyle />
            <PostsPresent />
            <ToastContainer />
        </PageWrapper>
    );
});
