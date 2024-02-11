'use client';

import { useSession } from 'next-auth/react';
import AuthForm from './components/AuthForm';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'unauthenticated' && <AuthForm />}
      {status === 'authenticated' && <div>{session?.user?.email}</div>}
    </div>
  );
}
