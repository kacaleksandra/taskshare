'use client';

import { useCookies } from 'next-client-cookies';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

import documentsLottie from '../ui/lotties/documents.json';
import tasksLottie from '../ui/lotties/tasks.json';
import { Button } from './_components/button';

export default function Home() {
  const cookies = useCookies();
  const router = useRouter();

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (cookies.get('session')) {
      router.push('/dashboard');
    } else {
      setShouldRender(true);
    }
  }, [router, cookies]);

  return (
    <div>
      {shouldRender && (
        <>
          <div className='relative'>
            <div className='absolute inset-0 bg-black opacity-40'></div>
            <Image
              src='/hero-photo.jpg'
              alt='Hero photo'
              width={1920}
              height={1080}
            />
            <div className='px-3 py-3 sm:px-8 sm:py-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-95 bg-white text-center rounded-lg border border-blue-600 border-opacity-50'>
              <p className='text-gray-800 sm:text-2xl font-medium'>
                Transform <span className='text-blue-600'>file sharing</span> in{' '}
                <span className='text-blue-600'>education</span> with us.
              </p>
              <Button
                size='lg'
                className='mb-2 mt-8 text-sm sm:text-lg px-16 py-6 hover:bg-blue-700'
                onClick={() => router.push('/sign-up')}
              >
                Join today
              </Button>
            </div>
          </div>
          <div className='mx-16 mt-14'>
            <div className='flex flex-row mb-10 py-10'>
              <div className='flex flex-col items-center justify-center mx-10 gap-4'>
                <h2 className='text-2xl font-medium text-center'>
                  Send files effortlessly
                </h2>
                <p className='sm:w-2/3 text-center'>
                  No more worries! Send files <b>seamlessly</b> and{' '}
                  <b>hassle-free</b>.
                </p>
              </div>
              <Lottie
                loop
                animationData={documentsLottie}
                play
                speed={0.5}
                className='hidden sm:block w-1/4 mx-auto'
              />
            </div>
            <div className='py-10 flex flex-row bg-blue-100 mb-6 rounded-lg'>
              <Lottie
                loop
                animationData={tasksLottie}
                play
                speed={0.4}
                className='hidden sm:block w-1/2 mx-auto'
              />
              <div className='flex flex-col items-center justify-center gap-4'>
                <h2 className='text-2xl font-medium text-center'>
                  For teachers
                </h2>
                <p className='sm:w-2/3 text-center px-2'>
                  Are you a teacher? Create <b>repositories</b>, assign{' '}
                  <b>tasks</b>, and forget about emails with task files.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
