import { useMutation } from '@tanstack/react-query';
import { authService } from '../../api/authService';
import { LoginDto } from '../../models/LoginDto';
import { toast } from 'react-toastify';
import { useProfile } from './useProfile';
import { handleAxiosError } from '@/lib/errorInterceptor';

export function useLogin() {
  const { profile } = useProfile();

  const login = useMutation({
    mutationFn: async (loginDto: LoginDto) => {
      const res = await authService.login(loginDto);

      return res.data;
    },
    onMutate: () => {
      toast.dismiss();
    },
    onSuccess: () => {
      profile.mutate();
    },
    onError: e => {
      handleAxiosError(e);
    },
  });

  return {
    login,
  };
}
