'use client';

import { Button } from '@/app/_components/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/dialog';
import { Form, FormField } from '@/app/_components/form';
import { FormItemWrapper } from '@/app/_components/form-item-wrapper';
import { Input } from '@/app/_components/input';
import { toast } from '@/app/_utils/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CirclePlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createCourseClient } from '../_api/client';

const CreateCourseDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    courseName: z.string().min(1, { message: 'Invalid course name' }),
    courseStartYear: z.coerce
      .number()
      .min(new Date().getFullYear(), {
        message: 'You can not choose year in the past.',
      })
      .max(2030, { message: '2030 is maximum year.' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: '',
      courseStartYear: 2024,
    },
  });

  const { mutate: createCourseMutation } = useMutation({
    mutationFn: createCourseClient,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async () => {
      setIsOpen(false);
      toast({ description: 'Course created successfully!' });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createCourseMutation(values);
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className='text-white border border-blue-400 bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg rounded-lg px-4 py-4 flex flex-col'>
          <div className='w-full'>
            <h2 className='text-center font-medium text-lg mt-2'>
              <CirclePlusIcon /> Create new course
            </h2>
            <p className='py-4 text-left'>
              Create new course for your students.
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Create a new course</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='courseName'
                render={({ field }) => (
                  <FormItemWrapper label='Course name'>
                    <Input {...field} />
                  </FormItemWrapper>
                )}
              />
              <FormField
                control={form.control}
                name='courseStartYear'
                render={({ field }) => (
                  <FormItemWrapper label='Course start year' className='my-4'>
                    <Input {...field} type='number' />
                  </FormItemWrapper>
                )}
              />
              <Button type='submit' className='w-full mt-5'>
                Create new course
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { CreateCourseDialog };
