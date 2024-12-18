'use client';

import * as React from 'react';
import { LoginButton } from '../category/LoginButton';
import { LogoutButton } from '../category/LogoutButton';
import { ManageButton } from '@/components/common/category/ManageButton';
import { useGetProfile } from '@/hooks/server/useGetProfile';

interface LoginGuardProps {
  isAuthorized: boolean;
}

export function LoginGuard({ isAuthorized }: LoginGuardProps) {
  const { error: isError } = useGetProfile();

  if (isError) {
    return <LoginButton />;
  }

  return (
    <>
      {isAuthorized ? (
        <>
          <ManageButton />
          <LogoutButton />
        </>
      ) : (
        <>
          <LoginButton />
        </>
      )}
    </>
  );
}
