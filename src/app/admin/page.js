'use client';
import React, { useEffect, useState } from 'react';
import { Label } from '@/src/components/label';
import { Input } from '@/src/components/input';
import { cn } from '@/utils/cn';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

const Login = () => {
  return (
    <div className=" pt-[10vh] bg-darkButNotBlack">
      <SignupFormDemo />
    </div>
  );
};

export function SignupFormDemo() {
  const [warning, setWarning] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input#email').value;
    const password = e.target.querySelector('input#password').value;
    const regex = new RegExp('^(.*?)@dynasty.ae$');
    if (regex.test(email)) {
      try {
        supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        router.push('/admin/list');
      } catch (err) {
        setWarning(true);
      }
    } else setWarning(true);
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Dynasty Admin log In
      </h2>
      {/* <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p> */}
      <form className="my-8" onSubmit={handleSubmit}>
        <p className="text-red-500 my-2 h-[20px]">
          {warning ? 'Incorrect email or password' : ''}
        </p>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label isDark={true} htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Tyler@dynasty.ae"
              type="text"
              isDark={true}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" isDark={true}>
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            isDark={true}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};

export default Login;
