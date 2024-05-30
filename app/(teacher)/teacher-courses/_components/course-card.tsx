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
import { cn } from '@/app/_utils/cn-helper';
import EditCourse from '@/app/course/_edit/edit-course';
import { CourseMiniProps } from '@/app/dashboard/_api/client';
import { Eye, LoaderCircle, UserRoundCheck, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

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
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button>Edit</Button>
        </DialogTrigger>
        <EditCourse
          courseId={id}
          onOpenChange={setIsOpen}
          queryKey='myOwnedCourses'
        />
      </Dialog>
    </Card>
  );
};

export default CourseCard;
