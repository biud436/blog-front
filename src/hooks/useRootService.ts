import { RootServiceContext } from '@/services/RootService';
import { useContext } from 'react';

export function useRootService() {
    const rootService = useContext(RootServiceContext);

    if (!rootService) {
        throw new Error(
            'RootService not found. Did you forget to wrap your component in <RootServiceContext.Provider>?',
        );
    }

    return rootService;
}
