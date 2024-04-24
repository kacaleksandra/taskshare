'use client';

import Lottie from 'react-lottie-player';
import notFound from 'ui/lotties/not-found.json';

export default function NotFoundPage() {
  return (
    <Lottie
      loop
      animationData={notFound}
      play
      className='w-1/2 lg:w-1/3  mx-auto mt-16'
    />
  );
}
