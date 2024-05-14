'use client';

import React from 'react';

import Enrolled from './_components/enrolled';
import Pending from './_components/pending';

const Page: React.FC = () => {
  return (
    <>
      <div className='mt-4'>
        <Enrolled />
        <Pending />
      </div>
    </>
  );
};

export default Page;
