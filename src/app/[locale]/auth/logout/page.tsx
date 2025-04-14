import { auth } from '@/auth';

import { redirect } from 'next/navigation';

import { Suspense } from 'react';

import { Logout } from './logout';

export default async function LogoutPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <Suspense>
      <Logout />
    </Suspense>
  );
}
