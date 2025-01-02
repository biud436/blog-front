/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@mui/material';
import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>오류가 발생했습니다.</h1>

          <p>페이지를 새로고침해주세요.</p>

          <Button onClick={() => this.setState({ hasError: false })}></Button>
        </>
      );
    }

    return this.props.children;
  }
}
