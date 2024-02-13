'use client';

import { useSession } from 'next-auth/react';
import AuthForm from './components/AuthForm';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="h-full bg-zinc-950">
      {status === 'loading' && <div>Loading...</div>}
      {status === 'unauthenticated' && <AuthForm />}
      {status === 'authenticated' && <div>{session?.user?.email}</div>}
    </div>
  );
}
