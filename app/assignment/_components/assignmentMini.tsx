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
import { Dialog, DialogContent, DialogTrigger } from '@/app/_components/dialog';
import { UseStoredUserInfo, UserInfoStore } from '@/app/_utils/zustand';
import { AssignmentMiniProps } from '@/app/course/[id]/_api/client';
import { TEACHER_ROLE_ID } from '@/constants';
import { EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import EditAssignment from '../_edit/edit-assignment';
import RemoveAssignment from '../_remove/remove-assignment';
import SubmitAssignment from '../_submit/submitAssignment';

const AssignmentMini: React.FC<AssignmentMiniProps> = ({
  id,
  name,
  visibility,
  deadlineDate,
  description,
  queryKey,
  isSubmitted,
}) => {
  const router = useRouter();
  const loggedUserInfo = UseStoredUserInfo(
    (state: UserInfoStore) => state.loggedUserInfo,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

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

  const goToAssignment = () => {
    router.push(`/assignment/${id}`);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.tagName !== 'BUTTON') {
      if (loggedUserInfo?.roleId === 2 || isSubmitted) {
        goToAssignment();
      } else {
        setIsOpen(true);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Card className='my-2 text-left' onClick={handleCardClick}>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <div className='flex items-center'>
              <span className='mr-3'>{name} </span>
              {visibility === false && <EyeOff />}
            </div>
            {loggedUserInfo?.roleId === TEACHER_ROLE_ID && (
              <div className='self-end' onClick={(e) => e.stopPropagation()}>
                <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
                  <DialogTrigger asChild>
                    <Button
                      variant={'outline'}
                      className='px-4 mr-1'
                      onClick={(e) => e.stopPropagation()}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <EditAssignment
                    assignmentId={id}
                    onOpenChange={setIsOpenEdit}
                    queryKey={queryKey}
                  />
                </Dialog>
                <Dialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
                  <DialogTrigger asChild>
                    <Button
                      variant={'destructive'}
                      className='px-4'
                      onClick={(e) => e.stopPropagation()}
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <RemoveAssignment
                    assignmentId={id}
                    onOpenChange={setIsOpenDelete}
                    queryKey={queryKey}
                  />
                </Dialog>
              </div>
            )}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant='outline' className={cardColor}>
            Due to: {new Date(deadlineDate).toLocaleString()}
          </Badge>
        </CardContent>
      </Card>
      <DialogContent>
        <SubmitAssignment assignmentID={id} onOpenChange={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentMini;
