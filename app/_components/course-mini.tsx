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

import { cn } from '../_utils/cn-helper';
import { CourseMiniProps } from '../dashboard/_api/client';

const CourseMini: React.FC<CourseMiniProps> = ({
  id,
  name,
  // iconPath,
  owner,
  approvalStatus,
  yearStart,
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

  const isApproved = approvalStatus === 1 || approvalStatus === 3;

  return (
    <Card
      className={isApproved ? 'cursor-pointer my-2' : 'my-2'}
      onClick={isApproved ? () => router.push(`/course/${id}`) : undefined}
    >
      <div className='flex flex-row w-full pr-8'>
        <CardHeader className='grow'>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            {owner.name} {owner.lastname}
          </CardDescription>
        </CardHeader>
        <div className='flex justify-center items-center'>
          {approvalStatusToIcon()}
        </div>
      </div>
      <CardFooter className='w-1/4'>
        <CardDescription>{yearStart}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default CourseMini;
