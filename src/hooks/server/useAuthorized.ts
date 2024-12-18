import { useEffect, useMemo } from 'react';
import { useProfile } from './useProfile';
import { useUserStore } from '@/store/user/UserStore';

export function useAuthorized() {
  const { profile } = useProfile();
  const isAuthorized = useUserStore((state) => state.isAuthorized);

  const memoizedIsAuthorized = useMemo(() => {
    return isAuthorized;
  }, [isAuthorized]);

  useEffect(() => {
    profile.mutate(void 0);
  }, [isAuthorized]);

  return {
    isAuthorized: memoizedIsAuthorized,
  };
}
