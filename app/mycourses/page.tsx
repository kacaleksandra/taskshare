'use client';

import React from 'react';

import Enrolled from './enrolled';
import Pending from './pending';

const Page: React.FC = () => {
  return (
    <>
      <Enrolled />
      <Pending />
    </>
  );
};

export default Page;
