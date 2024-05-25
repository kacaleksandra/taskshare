'use client';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/card';
import { UserRoundCheck, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { CourseMiniProps } from '../dashboard/_api/client';

const CourseMini: React.FC<CourseMiniProps> = ({
  id,
  name,
  iconPath,
  owner,
  approvalStatus,
}) => {
  const router = useRouter();

  return (
    <Card
      className='my-2 flex flex-row w-full cursor-pointer'
      onClick={() => router.push(`/course/${id}`)}
    >
      <CardHeader className='grow'>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {owner.name} {owner.lastname}
        </CardDescription>
      </CardHeader>
      <div className='flex justify-center items-center'>
        {approvalStatus === 1 ? <UserRoundCheck /> : <X />}
      </div>
      <CardFooter>
        {/* <CardDescription> */}
        {/* {year_start} */}
        {/* </CardDescription> */}
      </CardFooter>
    </Card>
  );
};

export default CourseMini;
