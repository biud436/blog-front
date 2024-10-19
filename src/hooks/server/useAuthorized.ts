import { useEffect, useMemo } from 'react';
import { useProfile } from './useProfile';
import { userStore } from '@/store/user/UserStore';

export function useAuthorized() {
  const { profile } = useProfile();

  const memoizedIsAuthorized = useMemo(() => {
    return userStore.getIsAuthorized();
  }, [userStore.isAuthorized]);

  useEffect(() => {
    profile.mutate(void 0);
  }, [userStore.isAuthorized]);

  return {
    isAuthorized: memoizedIsAuthorized,
  };
}
