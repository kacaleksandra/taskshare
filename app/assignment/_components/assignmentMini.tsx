'use client';

import { Badge } from '@/app/_components/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/card';
import { Dialog, DialogContent, DialogTrigger } from '@/app/_components/dialog';
import { AssignmentMiniProps } from '@/app/course/[id]/_api/client';
import React, { useState } from 'react';

import SubmitAssignment from './submitAssignment';

const AssignmentMini: React.FC<AssignmentMiniProps> = ({
  id,
  name,
  deadlineDate,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentDate = new Date();
  const assignmentDeadline = new Date(deadlineDate);
  const oneWeekBeforeDeadline = new Date(deadlineDate);
  oneWeekBeforeDeadline.setDate(oneWeekBeforeDeadline.getDate() - 7);

  let cardColor = 'text-blue-600 border-blue-600';
  if (currentDate > assignmentDeadline) {
    cardColor = 'text-zinc-700 border-zinc-700';
  } else if (currentDate > oneWeekBeforeDeadline) {
    cardColor =
      currentDate > oneWeekBeforeDeadline
        ? 'text-red-600 border-red-600'
        : 'text-zinc-950 border-zinc-950';
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className='w-full'>
        <Card className='my-2 text-left'>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant='outline' className={cardColor}>
              Due to: {new Date(deadlineDate).toLocaleString()}
            </Badge>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <SubmitAssignment onOpenChange={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentMini;
