import React from 'react';
import { AuthProvider } from '@/blog/providers/auth/authProvider';
import { CategoryServiceProvider } from '@/services/CategoryService';
import { PostServiceProvider } from '@/services/PostService';
import { RootServiceProvider } from '@/services/RootService';

export interface RootProviderProps {
    children: React.ReactNode;
}

/**
 * TODO: RootService를 생성하면 깊이를 줄일 수 있다.
 */
export function RootProvider({ children }: RootProviderProps) {
    return (
        <AuthProvider>
            <RootServiceProvider>
                <CategoryServiceProvider>
                    <PostServiceProvider>{children}</PostServiceProvider>
                </CategoryServiceProvider>
            </RootServiceProvider>
        </AuthProvider>
    );
}
