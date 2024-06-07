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
import Loader from '@/app/_components/loader';
import { toast } from '@/app/_utils/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { editAssignment, getAssignmentInfo } from './_api/client';

function EditAssignment({
  assignmentId,
  queryKey,
  onOpenChange,
}: {
  assignmentId: number;
  queryKey: string;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const [shouldRender, setShouldRender] = useState(false);
  const formSchema = z.object({
    name: z.string().min(1, { message: 'Assignment name is required' }),
    visibility: z.boolean(),
    description: z.string().min(1, { message: 'Description is required' }),
    deadlineDate: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      visibility: true,
      description: '',
      deadlineDate: new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
      ).toLocaleDateString(),
    },
  });

  const { mutate: editAssignmentMutation } = useMutation({
    mutationFn: editAssignment,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      onOpenChange(false);
    },
  });

  const { mutate: getPreviousAssignmentInfo } = useMutation({
    mutationFn: getAssignmentInfo,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async (assignment) => {
      setShouldRender(true);
      form.setValue('name', assignment.name);
      form.setValue('visibility', assignment.visibility);
      form.setValue('description', assignment.description);
      form.setValue('deadlineDate', assignment.deadlineDate);
    },
  });

  useEffect(() => {
    getPreviousAssignmentInfo(assignmentId);
  }, [getPreviousAssignmentInfo, assignmentId]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const dataToSend = {
      ...values,
      deadlineDate: new Date(values.deadlineDate).toISOString(),
    };

    editAssignmentMutation([assignmentId, dataToSend]);
  }

  return (
    <DialogContent className='flex items-center flex-col justify-center py-12'>
      <DialogTitle className='text-xl'>Edit Assignment</DialogTitle>
      <DialogDescription>
        Change the information about the assignment.
      </DialogDescription>
      {shouldRender ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4 w-3/4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItemWrapper label='Assignment Name'>
                  <Input {...field} />
                </FormItemWrapper>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItemWrapper label='Description'>
                  <Input {...field} />
                </FormItemWrapper>
              )}
            />

            <FormField
              control={form.control}
              name='visibility'
              render={({ field }) => (
                <FormItemWrapper label='Visibility'>
                  <FormItem>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormItem>
                </FormItemWrapper>
              )}
            />
            <FormField
              control={form.control}
              name='deadlineDate'
              render={({ field }) => (
                <FormItemWrapper label='Deadline'>
                  <Input {...field} type='datetime-local' className='w-max' />
                </FormItemWrapper>
              )}
            />
            <Button type='submit' className='w-full mt-4'>
              Edit
            </Button>
          </form>
        </Form>
      ) : (
        <Loader />
      )}
    </DialogContent>
  );
}

export default EditAssignment;
