import { useMutation } from '@tanstack/react-query';
import { authService } from '../../api/authService';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/user/UserStore';

export function useProfile() {
  const setUser = useUserStore((state) => state.setUser);
  const setIsAuthorized = useUserStore((state) => state.setIsAuthorized);
  const setIsDone = useUserStore((state) => state.setIsDone);

  const profile = useMutation({
    mutationFn: authService.getProfile,
    onMutate: () => {
      toast.dismiss();
      toast.info('프로필 정보를 가져오는 중입니다...', {
        isLoading: true,
        position: 'top-center',
      });
      setIsDone(false);
    },
    onSuccess: (profile) => {
      setUser(profile);
      setIsAuthorized(true);
    },
    onError: () => {
      setIsAuthorized(false);
    },
    onSettled: () => {
      toast.dismiss();
      setIsDone(true);
    },
  });

  return {
    profile,
  };
}
