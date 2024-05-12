'use client';

import React from 'react';

import Enrolled from './_components/enrolled';
import Pending from './_components/pending';

const Page: React.FC = () => {
  return (
    <>
      <Enrolled />
      <Pending />
    </>
  );
};

export default Page;
