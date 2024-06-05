'use client';

import { Button } from '@/app/_components/button';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/app/_components/dialog';
import { toast } from '@/app/_utils/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

import { deleteAssignment } from './_api/client';

function RemoveAssignment({
  assignmentId,
  queryKey,
  onOpenChange,
}: {
  assignmentId: number;
  queryKey: string;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const { mutate: removeAssignment } = useMutation({
    mutationFn: deleteAssignment,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      onOpenChange(false);
    },
  });

  return (
    <DialogContent className='flex items-center flex-col justify-center py-12'>
      <DialogTitle className='text-xl'>
        Are you sure you want to delete this assignment?
      </DialogTitle>
      <DialogDescription>
        Deleting this assignment will remove it from the course and all students
        will lose access to it. This action cannot be undone.
      </DialogDescription>
      <div className='flex'>
        <Button
          variant='destructive'
          onClick={() => removeAssignment(assignmentId)}
          className='mr-2'
        >
          Delete
        </Button>
        <Button
          variant='outline'
          onClick={() => onOpenChange(false)}
          className='ml-2'
        >
          Cancel
        </Button>
      </div>
    </DialogContent>
  );
}

export default RemoveAssignment;
