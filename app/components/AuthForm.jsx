'use client';

import axios from 'axios';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { IoMailOutline } from 'react-icons/io5';

const defaultValues = {
  email: '',
  name: '',
  password: '',
};

const AuthForm = () => {
  const [view, setView] = useState('LOGIN');
  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    await axios.post('/api/register', { ...data });
    await signIn('credentials', { ...data, redirect: false });
  };

  const toggleView = () => {
    if (view === 'LOGIN') {
      setView('REGISTER');
    } else {
      setView('LOGIN');
    }
  };

  const socialAction = async (action) => {
    const response = await signIn(action, {
      redirect: false,
      callbackUrl: '/',
    });
    if (response?.error) {
      console.log('Invalid credentials!');
    }

    if (response?.ok) {
      console.log('success');
    }
  };

  useEffect(() => {
    console.log('reset');
    reset(defaultValues);
  }, [view]);

  return (
    <div className="flex h-full items-center bg-batman-black ">
      <div className="grid h-full w-full max-w-md justify-items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-full content-center items-start bg-zinc-900 p-10 shadow-lg "
        >
          <div className="mb-6 flex gap-x-4 text-xl font-bold text-gray-500">
            <div
              onClick={() => {
                setView('LOGIN');
              }}
              className={clsx(
                { 'text-white': view === 'LOGIN' },
                'cursor-pointer transition-colors'
              )}
            >
              Login
            </div>
            <div
              onClick={() => {
                setView('REGISTER');
              }}
              className={clsx(
                { 'text-white': view === 'REGISTER' },
                'cursor-pointer transition-colors'
              )}
            >
              Signup
            </div>
          </div>
          {view === 'REGISTER' && (
            <Input
              type="text"
              placeholder="Full Name"
              {...register('name', { required: true })}
              register={register}
              id="name"
              required
              className="mb-3"
              icon={FaRegUser}
            />
          )}
          <Input
            type="email"
            placeholder="Email Address"
            register={register}
            id="email"
            required
            className="mb-3"
            icon={IoMailOutline}
          />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            register={register}
            id="password"
            required
            toggleShowPassword={toggleShowPassword}
            icon={showPassword ? AiOutlineEye : AiOutlineEyeInvisible}
            iconPointer={true}
          />
          <button
            type="submit"
            className="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
              font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-600"
          >
            Submit
          </button>
          <div className="mt-6">
            <div className="flex items-center justify-center">
              <div className="w-full border-t border-gray-500" />
              <div className="relative flex flex-shrink-0 justify-center text-sm">
                <span className="px-2 text-gray-500">Or continue with</span>
              </div>
              <div className="w-full border-t border-gray-500" />
            </div>

            <div className="mt-6 flex gap-2">
              <AuthSocialButton
                icon={BsGithub}
                onClick={async () => {
                  await socialAction('github');
                }}
              />
              <AuthSocialButton
                icon={BsGoogle}
                onClick={async () => {
                  await socialAction('google');
                }}
              />
            </div>
            <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
              <div>
                {view === 'LOGIN'
                  ? 'New to cinemate?'
                  : 'Already have an account?'}
              </div>
              <div onClick={toggleView} className="cursor-pointer underline">
                {view === 'LOGIN' ? 'Create an account' : 'Login'}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="h-full w-full bg-banner-pattern bg-cover bg-center bg-no-repeat" />
    </div>
  );
};
export default AuthForm;
