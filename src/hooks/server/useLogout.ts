import { useMutation } from '@tanstack/react-query';
import { authService } from '../../api/authService';
import { URL_MAP } from '../../common/URL';
import { userStore } from '@/store/user/UserStore';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();

  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      userStore.clearUser();

      setTimeout(() => {
        router.replace(URL_MAP.MAIN);
      }, 100);
    },
  });

  return {
    logout,
  };
}
