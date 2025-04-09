'use client';

import { Provider as MobXProvider } from 'mobx-react';
import { Provider as ReduxProvider } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { observer } from 'mobx-react';

import { authStore } from '~/stores/authStore';
import { store } from '~/app/store/store';

const stores = {
  authStore,
};

const AuthWrapper = observer(({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const publicPaths = ['/Login', '/register', '/forgot-password'];

  useEffect(() => {
    if (!authStore.isInitialized) {
      authStore.getCurrentUser();
    }
  }, []);

  useEffect(() => {
    if (
      authStore.isInitialized &&
      !authStore.isAuthenticated &&
      !publicPaths.includes(pathname)
    ) {
      router.push('/Login');
    }
  }, [authStore.isInitialized, authStore.isAuthenticated, pathname]);

  if (!authStore.isInitialized) {
    return null; 
  }

  return <>{children}</>;
});

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <MobXProvider {...stores}>
        <AuthWrapper>{children}</AuthWrapper>
      </MobXProvider>
    </ReduxProvider>
  );
}
