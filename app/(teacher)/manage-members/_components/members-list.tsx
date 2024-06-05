'use client';

import { Button } from '@/app/_components/button';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/app/_components/dialog';
import { ScrollArea } from '@/app/_components/scroll-area';
import { toast } from '@/app/_utils/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import {
  acceptStudentClient,
  getCourseMembers,
  removeStudentClient,
} from '../_api/client';

function MembersListDialog({
  courseId,
  onOpenChange,
  queryKey,
}: {
  courseId: number;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  queryKey?: string;
}) {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ['members'],
    queryFn: () => getCourseMembers(courseId),
  });

  const { mutate: acceptStudent } = useMutation({
    mutationFn: ({ courseId, userId }: { courseId: number; userId: number }) =>
      acceptStudentClient(courseId, userId),
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async () => {
      onOpenChange(false);
      if (queryKey) queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const { mutate: removeStudent } = useMutation({
    mutationFn: ({ courseId, userId }: { courseId: number; userId: number }) =>
      removeStudentClient(courseId, userId),
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async () => {
      onOpenChange(false);
      if (queryKey) queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return (
    <DialogContent className='flex items-center flex-col justify-center py-12 gap-6'>
      <DialogTitle className='text-xl'>Manage members</DialogTitle>
      <div className='w-full'>
        <h3 className='text-center text-lg font-medium'>Pending users</h3>
        {data?.pendingUsers.length === 0 ? (
          <p className='py-4 text-gray-400 text-sm'>No pending users.</p>
        ) : (
          <ScrollArea className='w-full max-h-48'>
            {data?.pendingUsers.map((user: any) => (
              <div
                key={user.id}
                className='flex justify-between py-4 border-b-2'
              >
                <p>
                  {user.name} {user.lastname}: {user.email}
                </p>
                <Check
                  className='text-green-700  cursor-pointer'
                  onClick={() => acceptStudent(data.id, user.id)}
                />
                <X
                  className='text-red-600  cursor-pointer'
                  onClick={() => removeStudent(data.id, user.id)}
                />
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
      <div className='w-full'>
        <h3 className='text-center text-lg font-medium'>Enrolled users</h3>
        {data?.enrolledUsers.length === 0 ? (
          <p className='py-4  text-gray-400 text-sm'>No enrolled users.</p>
        ) : (
          <ScrollArea className='w-full max-h-48'>
            {data?.enrolledUsers.map((user: any) => (
              <div
                key={user.id}
                className='flex justify-between w-full grow py-4 border-b-2'
              >
                <p>
                  {user.name} {user.lastname}: {user.email}
                </p>
                <X
                  className='text-red-600  cursor-pointer'
                  onClick={() => removeStudent(data.id, user.id)}
                />
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
    </DialogContent>
  );
}

export default MembersListDialog;
