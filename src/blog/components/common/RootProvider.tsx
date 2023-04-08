import React from 'react';
import { AuthProvider } from '@/blog/providers/auth/authProvider';
import { CategoryServiceProvider } from '@/services/CategoryService';
import { PostServiceProvider } from '@/services/PostService';

export interface RootProviderProps {
    children: React.ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
    return (
        <CategoryServiceProvider>
            <PostServiceProvider>
                <AuthProvider>{children}</AuthProvider>
            </PostServiceProvider>
        </CategoryServiceProvider>
    );
}
