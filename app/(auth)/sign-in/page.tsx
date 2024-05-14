'use client';

import { Button } from '@/app/_components/button';
import { Form, FormField } from '@/app/_components/form';
import { FormItemWrapper } from '@/app/_components/form-item-wrapper';
import { Input } from '@/app/_components/input';
import { UseStoredUserInfo } from '@/app/_utils/get-user-info';
import { toast } from '@/app/_utils/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'next-client-cookies';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getUserInfo, loginUserClient } from './_api/client';

function SignInPage() {
  const router = useRouter();
  const cookies = useCookies();

  const [shouldRender, setShouldRender] = useState(false);
  const updateUserInfoStore = UseStoredUserInfo((state) => state.update);

  const formSchema = z.object({
    email: z.string().email().min(1, { message: 'Invalid email' }),
    password: z.string().min(1, { message: 'Password is required' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: login } = useMutation({
    mutationFn: loginUserClient,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async (token) => {
      cookies.set('session', token);
      sessionStorage.setItem('session', token);
      await setUserinfo();
      await router.push('/dashboard');
      await router.refresh();
    },
  });

  const { mutate: setUserinfo } = useMutation({
    mutationFn: getUserInfo,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async (userInfo) => {
      updateUserInfoStore(userInfo);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values);
  }

  useEffect(() => {
    if (cookies.get('session')) {
      router.push('/dashboard');
    } else {
      setShouldRender(true);
    }
  }, [router, cookies]);

  return (
    shouldRender && (
      <>
        <div className='w-full flex flex-col justify-center lg:grid lg:grid-cols-2 h-[95vh]'>
          <div className='flex items-center justify-center py-12'>
            <div className='mx-auto grid w-[350px] gap-6'>
              <div className='grid gap-2 text-center'>
                <h1 className='text-3xl font-bold'>Login</h1>
                <p className='text-balance text-muted-foreground'>
                  Enter your email below to login to your account
                </p>
              </div>
              <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItemWrapper label='Email'>
                          <Input {...field} />
                        </FormItemWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='password'
                      render={({ field }) => (
                        <FormItemWrapper label='Password' className='my-4'>
                          <Input {...field} type='password' />
                        </FormItemWrapper>
                      )}
                    />
                    <Button type='submit' className='w-full mt-5'>
                      Login
                    </Button>
                  </form>
                </Form>
              </div>

              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link href='/sign-up' className='underline'>
                  Sign up
                </Link>
              </div>
            </div>
          </div>
          <div className='hidden lg:flex justify-center items-center bg-gray-100'>
            <Image
              src='/logo-full.png'
              alt='Image'
              width={500}
              height={140}
              className='mx-auto'
              priority
            />
          </div>
        </div>
      </>
    )
  );
}

export default SignInPage;
