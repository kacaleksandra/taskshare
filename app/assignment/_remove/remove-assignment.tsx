'use client';

import { Button } from '@/app/_components/button';
import { Checkbox } from '@/app/_components/checkbox';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/app/_components/dialog';
import { Form, FormField, FormItem } from '@/app/_components/form';
import { FormItemWrapper } from '@/app/_components/form-item-wrapper';
import { Input } from '@/app/_components/input';
import { toast } from '@/app/_utils/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { deleteAssignment } from './_api/client';

function RemoveAssignment({
  assignmentId,
  onOpenChange,
}: {
  assignmentId: number;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const { mutate: removeAssignment } = useMutation({
    mutationFn: deleteAssignment,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async () => {
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
