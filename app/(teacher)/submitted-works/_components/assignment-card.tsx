'use client';

import { Badge } from '@/app/_components/badge';
import { Button } from '@/app/_components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/card';
import { Dialog, DialogTrigger } from '@/app/_components/dialog';
import { UseStoredUserInfo, UserInfoStore } from '@/app/_utils/zustand';
import { AssignmentMiniProps } from '@/app/course/[id]/_api/client';
import { EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import WorksDialog from './works-dialog';

const AssignmentCard: React.FC<AssignmentMiniProps> = ({
  id,
  name,
  visibility,
  deadlineDate,
  description,
  queryKey,
}) => {
  const router = useRouter();
  const loggedUserInfo = UseStoredUserInfo(
    (state: UserInfoStore) => state.loggedUserInfo,
  );
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
    <Card className='my-2 text-left flex flex-row'>
      <div className='flex grow flex-col'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <div className='flex items-center'>
              <span className='mr-3'>{name} </span>
              {visibility === false && <EyeOff />}
            </div>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant='outline' className={cardColor}>
            Due to: {new Date(deadlineDate).toLocaleString()}
          </Badge>
        </CardContent>
      </div>
      <div className='flex items-center mr-4'>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Check submissions</Button>
          </DialogTrigger>
          <WorksDialog assignmentId={id} isOpen={isOpen} />
        </Dialog>
      </div>
    </Card>
  );
};

export default AssignmentCard;
