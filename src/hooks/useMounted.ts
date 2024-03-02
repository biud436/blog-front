import { useEffect, useState } from 'react';

/**
 * 마운트 여부를 반환하는 훅
 *
 */
export function useMounted() {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return [isMounted];
}
