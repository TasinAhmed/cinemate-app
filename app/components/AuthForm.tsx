'use client';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';

type Views = 'LOGIN' | 'REGISTER';

const Login = () => {
  const [view, setView] = useState<Views>('LOGIN');
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await axios.post('/api/register', { ...data });
  };

  const toggleView = () => {
    if (view === 'LOGIN') {
      setView('REGISTER');
    } else {
      setView('LOGIN');
    }
  };

  const socialAction = async (action: string) => {
    const response = await signIn(action, { redirect: false });
    if (response?.error) {
      console.log('Invalid credentials!');
    }

    if (response?.ok) {
      console.log('success');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>{view}</div>
        <input type="email" {...register('email', { required: true })} />
        <input type="password" {...register('password', { required: true })} />
        <button type="submit">Submit</button>
        <button onClick={toggleView}>Toggle</button>
        <button
          onClick={async () => {
            await socialAction('google');
          }}
        >
          Google
        </button>
        <button
          onClick={async () => {
            await socialAction('github');
          }}
        >
          Github
        </button>
      </form>
    </div>
  );
};
export default Login;
