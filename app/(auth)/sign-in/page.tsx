'use client';

import { Button } from '@/app/_components/button';
import { Form, FormField } from '@/app/_components/form';
import { FormItemWrapper } from '@/app/_components/form-item-wrapper';
import { Input } from '@/app/_components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function SignInPage() {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // to be implemented with backend
    console.log(values);
  }

  return (
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
                      <Input {...field} />
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
  );
}

export default SignInPage;
