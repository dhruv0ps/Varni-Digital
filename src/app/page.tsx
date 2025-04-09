'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '~/stores/useStore';
import Login from './Login/page';

export default function Home() {
  const router = useRouter();
  const { authStore } = useStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get current user if we have a token
        await authStore.getCurrentUser();
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, [authStore]);

  // Show loading state while checking authentication
  if (authStore.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, show login page
  if (!authStore.isAuthenticated) {
    return <Login />;
  }

  // If authenticated, show main app content
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-2xl font-bold">Welcome, {authStore.user?.username}!</h1>
        {authStore.isAdmin && (
          <p className="text-green-600">Admin Access Granted</p>
        )}
        <button
          onClick={() => authStore.logout()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
