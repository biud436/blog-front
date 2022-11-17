import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';
import { useTranslation } from 'react-i18next';
import { RecoilRoot } from 'recoil';
import { Routes } from 'react-router';
import { AuthProvider } from './providers/auth/authProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { URL_MAP } from 'common/URL';
import { QueryClient, QueryClientProvider } from 'react-query';

import { LoginPage } from './pages/login';
import { NotFoundPage } from './pages/error';
import { Container } from '@mui/material';
import { PostEditorContainer } from './pages/editor';
import { PostsPresent } from './components/posts/PostsPresent';
import { PostsPage } from './pages/posts';
import { CategoryServiceProvider } from '@/services/CategoryService';
import { PostsServiceProvider } from '@/services/PostsService';
import { PostPage } from './pages/post';
import { PostServiceProvider } from '@/services/PostService';
import { GithubCallbackPage } from './pages/github';

const queryClient = new QueryClient();

export function App() {
    const { i18n } = useTranslation();

    return (
        <QueryClientProvider client={queryClient}>
            <React.Suspense fallback={<div>Loading...</div>}>
                <CategoryServiceProvider>
                    <PostServiceProvider>
                        <AuthProvider>
                            <BrowserRouter
                                basename={
                                    process.env.NODE_ENV === 'production'
                                        ? '/'
                                        : ''
                                }
                            >
                                <Helmet
                                    titleTemplate="%s - 어진석의 블로그"
                                    defaultTitle="어진석의 블로그"
                                    htmlAttributes={{ lang: i18n.language }}
                                >
                                    <meta name="description" content="" />
                                </Helmet>
                                <GlobalStyle />
                                <Routes></Routes>
                                <ToastContainer />
                            </BrowserRouter>
                        </AuthProvider>
                    </PostServiceProvider>
                </CategoryServiceProvider>
            </React.Suspense>
        </QueryClientProvider>
    );
}
