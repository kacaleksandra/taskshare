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

import { deleteCourseClient } from '../_api/client';

function DeleteCourse({
  courseId,
  onOpenChange,
  queryKey,
}: {
  courseId: number;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  queryKey?: string;
}) {
  const queryClient = useQueryClient();

  const { mutate: deleteCourse } = useMutation({
    mutationFn: () => deleteCourseClient(courseId),
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async () => {
      onOpenChange(false);
      if (queryKey) queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return (
    <DialogContent className='flex items-center flex-col justify-center py-12 gap-8'>
      <DialogTitle className='text-xl'>Remove course</DialogTitle>
      <DialogDescription>
        Are you sure you want to remove this course?
      </DialogDescription>
      <Button variant='destructive' size='lg' onClick={() => deleteCourse()}>
        Delete course
      </Button>
    </DialogContent>
  );
}

export default DeleteCourse;
