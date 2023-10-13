import React from 'react';
import { AuthProvider } from '@/blog/providers/auth/authProvider';
import { CategoryServiceProvider } from '@/services/CategoryService';
import { RootServiceProvider } from '@/services/RootService';

export interface RootProviderProps {
    children: React.ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
    return (
        <AuthProvider>
            <RootServiceProvider>
                <CategoryServiceProvider>{children}</CategoryServiceProvider>
            </RootServiceProvider>
        </AuthProvider>
    );
}
