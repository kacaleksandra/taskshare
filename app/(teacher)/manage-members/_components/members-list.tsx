'use client';

import { DialogContent, DialogTitle } from '@/app/_components/dialog';
import { ScrollArea } from '@/app/_components/scroll-area';
import { toast } from '@/app/_utils/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, X } from 'lucide-react';

import {
  acceptStudentClient,
  getCourseMembers,
  removeStudentClient,
} from '../_api/client';

function MembersListDialog({
  courseId,
  isOpen,
  queryKey,
}: {
  courseId: number;
  isOpen: boolean;
  queryKey?: string;
}) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['members'],
    queryFn: () => getCourseMembers(courseId),
    enabled: isOpen,
  });

  const { mutate: acceptStudent } = useMutation({
    mutationFn: ({ courseId, userId }: { courseId: number; userId: number }) =>
      acceptStudentClient(courseId, userId),
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async () => {
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
      if (queryKey) queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return (
    <DialogContent className='flex items-center flex-col justify-center py-12 gap-6'>
      <DialogTitle className='text-xl'>Manage members</DialogTitle>
      <div className='w-full'>
        <h3 className='text-center text-lg font-medium'>Pending users</h3>
        {data?.pendingUsers.length === 0 ? (
          <p className='py-4 text-gray-400 text-sm text-center'>
            No pending users.
          </p>
        ) : (
          <ScrollArea className='w-full max-h-48'>
            {data?.pendingUsers.map((user: any) => (
              <div
                key={user.id}
                className='flex justify-between py-4 border-b-2'
              >
                <p className='w-3/4'>
                  {user.name} {user.lastname}: {user.email}
                </p>
                <Check
                  className='text-green-700  cursor-pointer'
                  onClick={() =>
                    acceptStudent({ courseId: data.id, userId: user.id })
                  }
                />
                <X
                  className='text-red-600  cursor-pointer'
                  onClick={() =>
                    removeStudent({ courseId: data.id, userId: user.id })
                  }
                />
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
      <div className='w-full'>
        <h3 className='text-center text-lg font-medium'>Enrolled users</h3>
        {data?.enrolledUsers.length === 0 ? (
          <p className='py-4  text-gray-400 text-sm text-center'>
            No enrolled users.
          </p>
        ) : (
          <ScrollArea className='w-full max-h-48'>
            {data?.enrolledUsers.map((user: any) => (
              <div
                key={user.id}
                className='flex justify-between w-full grow py-4 border-b-2'
              >
                <p className='w-3/4'>
                  {user.name} {user.lastname}: {user.email}
                </p>
                <X
                  className='text-red-600  cursor-pointer'
                  onClick={() =>
                    removeStudent({ courseId: data.id, userId: user.id })
                  }
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
