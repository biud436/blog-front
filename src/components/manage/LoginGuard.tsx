import { Grid2 as Grid, CircularProgress } from '@mui/material';
import React from 'react';
import { FAKE_CRON, useTimedEffect } from '@/hooks/useTimedEffect';
import { useAuthorized } from '@/hooks/auth/useAuthorized';

export function LoginGuardPresent() {
  useTimedEffect(() => {
    location.href = '/';
  }, FAKE_CRON.EVERY_3_SECONDS);

  return (
    <Grid
      container
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid
        size={{ xs: 6 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <CircularProgress color="secondary" />
      </Grid>
    </Grid>
  );
}

export interface LoginGuardProps {
  children: JSX.Element;
}

export const LoginGuard = ({ children }: LoginGuardProps) => {
  const [isAuthorized] = useAuthorized();

  return !isAuthorized ? <LoginGuardPresent /> : children;
};
