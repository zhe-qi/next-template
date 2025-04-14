'use client';

import { signOut } from 'next-auth/react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

export function Logout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl: string = (searchParams.get('callbackUrl') as string) ?? '/';

  useEffect(() => {
    const handleLogout = async () => {
      await signOut({ redirect: true, callbackUrl });
    };
    handleLogout();
  }, [router, callbackUrl]);

  return null;
}
