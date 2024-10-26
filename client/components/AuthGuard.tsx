"use client"
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/store';
import LoadingComponent from './LoadingComponent';
import { useRouter } from 'next/navigation';

const AuthGuard: React.FC<{ children: React.ReactNode }> = observer(({ children }) => {
  const router = useRouter();
  const { userStore } = useStore();

  useEffect(() => {
    if (!userStore.token) {
      router.replace('/login');
    }
  }, [userStore.token, router]);

  if (!userStore.token) {
    return <LoadingComponent />;
  }

  return <>{children}</>;
});

export default AuthGuard;
