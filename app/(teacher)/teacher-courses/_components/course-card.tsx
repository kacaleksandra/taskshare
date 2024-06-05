'use client';

import { Button } from '@/app/_components/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/card';
import { Dialog, DialogTrigger } from '@/app/_components/dialog';
import EditCourse from '@/app/course/_edit/edit-course';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import DeleteCourse from './delete-course-dialog';

const CourseCard = ({
  id,
  name,
  yearStart,
}: {
  id: number;
  name: string;
  yearStart: number;
}) => {
  const router = useRouter();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenRemove, setIsOpenRemove] = useState(false);

  return (
    <Card className='my-2 cursor-pointer flex flex-row justify-between items-center pr-6'>
      <div
        className='flex grow flex-col w-full'
        onClick={() => router.push(`/course/${id}`)}
      >
        <div className='flex flex-row w-full pr-8'>
          <CardHeader className='grow'>
            <CardTitle>{name}</CardTitle>
          </CardHeader>
        </div>
        <CardFooter className='w-1/4'>
          <CardDescription>{yearStart}</CardDescription>
        </CardFooter>
      </div>
      <div className='flex gap-2 flex-col'>
        <Dialog onOpenChange={setIsOpenEdit} open={isOpenEdit}>
          <DialogTrigger asChild>
            <Button>Edit</Button>
          </DialogTrigger>
          <EditCourse
            courseId={id}
            onOpenChange={setIsOpenEdit}
            queryKey='myOwnedCourses'
          />
        </Dialog>
        <Dialog onOpenChange={setIsOpenRemove} open={isOpenRemove}>
          <DialogTrigger asChild>
            <Button variant='destructive'>Delete</Button>
          </DialogTrigger>
          <DeleteCourse
            courseId={id}
            onOpenChange={setIsOpenRemove}
            queryKey='myOwnedCourses'
          />
        </Dialog>
      </div>
    </Card>
  );
};

export default CourseCard;
