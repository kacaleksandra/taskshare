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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createAssignment } from './_api/client';

function CreateAssignment({
  courseId,
  queryKey,
  onOpenChange,
}: {
  courseId: string;
  queryKey: string;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const formSchema = z.object({
    name: z.string().min(1, { message: 'Assignment name is required' }),
    visibility: z.boolean(),
    description: z.string().min(1, { message: 'Description is required' }),
    deadlineDate: z.string().min(1, { message: 'Deadline is required' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      visibility: true,
      description: '',
      deadlineDate: '',
    },
  });

  const { mutate: createNewAssignment } = useMutation({
    mutationFn: createAssignment,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      onOpenChange(false);
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const dataToSend = {
      ...values,
      courseId: Number(courseId),
      deadlineDate: new Date(values.deadlineDate).toISOString(),
    };
    createNewAssignment(dataToSend);
  }

  return (
    <DialogContent className='flex items-center flex-col justify-center py-12'>
      <DialogTitle className='text-xl'>Create Assignment</DialogTitle>
      <DialogDescription>
        Describe the assignment and set the deadline.
      </DialogDescription>

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
            Create
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}

export default CreateAssignment;
