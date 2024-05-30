'use client';

import { Button } from '@/app/_components/button';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/app/_components/dialog';
import { Form, FormField } from '@/app/_components/form';
import { FormItemWrapper } from '@/app/_components/form-item-wrapper';
import { Input } from '@/app/_components/input';
import { toast } from '@/app/_utils/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getCourseInfo } from '../[id]/_api/client';
import { editCourse } from './_api/client';

const LABEL_STYLES = {
  selected: 'text-sm px-2 font-normal font-semibold',
  unselected: 'text-sm px-2 font-normal',
};

function EditCourse({
  courseId,
  onOpenChange,
  queryKey,
}: {
  courseId: number;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  queryKey?: string;
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const queryClient = useQueryClient();

  const formSchema = z.object({
    name: z.string().min(1, { message: 'Course name is required' }),
    yearStart: z.coerce
      .number()
      .min(new Date().getFullYear() - 5, { message: 'Write correct year' })
      .max(new Date().getFullYear() + 5, { message: 'Write correct year' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      yearStart: new Date().getFullYear(),
    },
  });

  const { mutate: editCourseInfo } = useMutation({
    mutationFn: editCourse,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async () => {
      onOpenChange(false);
      if (queryKey) queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const { mutate: getPreviousCourseInfo } = useMutation({
    mutationFn: getCourseInfo,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async (course) => {
      setShouldRender(true);
      form.setValue('name', course.name);
      form.setValue('yearStart', course.yearStart);
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const dataToSend = { ...values, iconPath: 'house' };

    editCourseInfo([courseId, dataToSend]);
  }

  useEffect(() => {
    getPreviousCourseInfo(courseId);
  }, []);

  return (
    shouldRender && (
      <DialogContent className='flex items-center flex-col justify-center py-12'>
        <DialogTitle className='text-xl'>Edit course</DialogTitle>
        <DialogDescription>
          Change your information about the course
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
                <FormItemWrapper label='Course Name'>
                  <Input {...field} />
                </FormItemWrapper>
              )}
            />
            <FormField
              control={form.control}
              name='yearStart'
              render={({ field }) => (
                <FormItemWrapper label='Start Year'>
                  <Input {...field} type='number' />
                </FormItemWrapper>
              )}
            />
            <Button type='submit' className='w-full mt-4'>
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    )
  );
}

export default EditCourse;
