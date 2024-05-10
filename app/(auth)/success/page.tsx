'use client';

import { Button } from '@/app/_components/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUpSuccessPage = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col gap-6 h-full items-center justify-center'>
      <p className='text-lg font-semibold tracking-wide'>
        You have successfully signed-up!
      </p>
      <p>Now, you can login with button below.</p>
      <Button
        size='lg'
        className='my-4 w-1/3'
        onClick={() => router.push('/sign-in')}
      >
        Login
      </Button>
    </div>
  );
};

export default SignUpSuccessPage;
