'use client';

import { useSession } from 'next-auth/react';
import AuthForm from '../components/AuthForm';
import { redirect } from 'next/navigation';
import Loader from '../components/Loader';

const Login = () => {
  const { status } = useSession();

  if (status === 'loading') {
    return <Loader />;
  } else if (status === 'authenticated') {
    return redirect('/');
  } else {
    return (
      <div className="h-full bg-zinc-950">
        <AuthForm />
      </div>
    );
  }
};
export default Login;
