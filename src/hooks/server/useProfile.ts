import { useMutation } from '@tanstack/react-query';
import { authService } from '../../api/authService';
import { toast } from 'react-toastify';
import { userStore } from '@/store/user/UserStore';

export function useProfile() {
  const profile = useMutation({
    mutationFn: authService.getProfile,
    onMutate: () => {
      toast.dismiss();
      toast.info('프로필 정보를 가져오는 중입니다...', {
        isLoading: true,
        position: 'top-center',
      });
      userStore.setIsDone(false);
    },
    onSuccess: profile => {
      userStore.setUser(profile);
      userStore.setIsAuthorized(true);
    },
    onError: () => {
      userStore.setIsAuthorized(false);
    },
    onSettled: () => {
      toast.dismiss();
      userStore.setIsDone(true);
    },
  });

  return {
    profile,
  };
}
