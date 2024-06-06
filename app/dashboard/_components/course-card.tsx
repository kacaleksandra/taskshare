'use client';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/card';
import { toast } from '@/app/_utils/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Eye,
  LoaderCircle,
  UserRoundCheck,
  UserRoundPlusIcon,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { CourseMiniProps, sendRequestToJoinCourse } from '../_api/client';

const CourseCard: React.FC<CourseMiniProps> = ({
  id,
  name,
  queryKey,
  owner,
  approvalStatus,
  yearStart,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const approvalStatusToIcon = () => {
    switch (approvalStatus) {
      case 0:
        return (
          <div title='You do not have access to this course.'>
            <X />
          </div>
        );
      case 1:
        return (
          <div title='You have joined to this course.'>
            <UserRoundCheck />
          </div>
        );
      case 2:
        return (
          <div title='You are waiting for approval by owner of this course.'>
            <LoaderCircle />
          </div>
        );
      case 3:
        return (
          <div title='You are owner of this course.'>
            <Eye />
          </div>
        );
    }
  };

  const { mutate: sendRequest } = useMutation({
    mutationFn: sendRequestToJoinCourse,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async () => {
      toast({ description: 'Request sent.' });
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const isApproved = approvalStatus === 1 || approvalStatus === 3;
  const canSendRequest = approvalStatus === 0;

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
        <div className='flex gap-4 items-center '>
          <div title='Send request'>
            {canSendRequest && (
              <UserRoundPlusIcon
                className='size-6 stroke-blue-800 stroke-2 cursor-pointer'
                onClick={() => sendRequest(id)}
              />
            )}
          </div>
          {approvalStatusToIcon()}
        </div>
      </div>
      <CardFooter className='w-1/4'>
        <CardDescription>{yearStart}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
