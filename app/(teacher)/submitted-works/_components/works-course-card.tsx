'use client';

import { Button } from '@/app/_components/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/card';
import { useRouter } from 'next/navigation';

const WorksCourseCard = ({
  id,
  name,
  yearStart,
}: {
  id: number;
  name: string;
  yearStart: number;
}) => {
  const router = useRouter();

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
        <Button
          onClick={() => router.push(`/submitted-works/assignments/${id}`)}
        >
          Check assignments and works
        </Button>
      </div>
    </Card>
  );
};

export default WorksCourseCard;
