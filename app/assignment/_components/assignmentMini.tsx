'use client';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// const element = <FontAwesomeIcon icon={} />
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/card';
import { AssignmentMiniProps } from '@/app/course/[id]/_api/client';
import { useRouter } from 'next/navigation';
import React from 'react';


const AssignmentMini: React.FC<AssignmentMiniProps> = ({
  id,
  name,
  deadlineDate,
  description,
}) => {
  const router = useRouter();

  const currentDate = new Date();
  const assignmentDeadline = new Date(deadlineDate);
  const oneWeekBeforeDeadline = new Date(deadlineDate);
  oneWeekBeforeDeadline.setDate(oneWeekBeforeDeadline.getDate() - 7);

  let cardColor = 'text-zinc-950';
  if (currentDate > assignmentDeadline) {
    cardColor = 'text-zinc-700';
  } else if (currentDate > oneWeekBeforeDeadline) {
    cardColor = currentDate > oneWeekBeforeDeadline ? 'text-red-600' : 'text-zinc-950';
  }
  return (
    <Card className='my-2' onClick={() => router.push(`/assignment/${id}`)}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <CardDescription className={cardColor}>
          Due to: {new Date(deadlineDate).toLocaleString()}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default AssignmentMini;
