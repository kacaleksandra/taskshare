'use client';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/card';
import { Eye, LoaderCircle, UserRoundCheck, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { CourseMiniProps } from '../dashboard/_api/client';

const CourseMini: React.FC<CourseMiniProps> = ({
  id,
  name,
  // iconPath,
  owner,
  approvalStatus,
}) => {
  const router = useRouter();

  const approvalStatusToIcon = () => {
    switch (approvalStatus) {
      case 0:
        return <X />;
      case 1:
        return <UserRoundCheck />;
      case 2:
        return <LoaderCircle />;
      case 3:
        return <Eye />;
    }
  };

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
        {approvalStatusToIcon()}
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
