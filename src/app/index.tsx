import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';
import { useTranslation } from 'react-i18next';
import { RecoilRoot } from 'recoil';
import { Routes } from 'react-router';
import { AuthProvider } from './providers/authProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { URL_MAP } from 'common/URL';
import { QueryClient, QueryClientProvider } from 'react-query';

import { LoginPage } from './pages/login';
import { NotFoundPage } from './pages/error';
import { Container } from '@mui/material';
import { PostEditorContainer } from './pages/editor';
import { PostsPresent } from './components/PostsPresent';
import { PostsPage } from './pages/posts';

const queryClient = new QueryClient();

export function App() {
    const { i18n } = useTranslation();

    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <AuthProvider>
                        <BrowserRouter
                            basename={
                                process.env.NODE_ENV === 'production' ? '/' : ''
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
                            <Routes>
                                <Route
                                    path={URL_MAP.LOGIN}
                                    element={<LoginPage />}
                                />
                                <Route
                                    path={URL_MAP.MAIN}
                                    element={<PostsPage />}
                                />
                                <Route
                                    path={URL_MAP.POST_EDIT}
                                    element={<PostEditorContainer />}
                                />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                            <ToastContainer />
                        </BrowserRouter>
                    </AuthProvider>
                </React.Suspense>
            </RecoilRoot>
        </QueryClientProvider>
    );
}
