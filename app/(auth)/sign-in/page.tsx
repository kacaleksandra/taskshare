'use client';

import { Button } from '@/app/_components/button';
import { Input } from '@/app/_components/input';
import { Label } from '@radix-ui/react-label';
import Image from 'next/image';
import Link from 'next/link';

function SignInPage() {
  return (
    <div className='w-full h-screen flex flex-col justify-center lg:grid lg:grid-cols-2 xl:min-h-[800px]'>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Login</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your email below to login to your account
            </p>
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
              </div>
              <Input id='password' type='password' required />
            </div>
            <Button type='submit' className='w-full'>
              Login
            </Button>
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
