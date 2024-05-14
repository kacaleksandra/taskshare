'use client';

import { Button } from '@/app/_components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/card';
import { Form, FormField } from '@/app/_components/form';
import { FormItemWrapper } from '@/app/_components/form-item-wrapper';
import { Input } from '@/app/_components/input';
import { Label } from '@/app/_components/label';
import { Switch } from '@/app/_components/switch';
import { toast } from '@/app/_utils/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getCourseInfo } from '../../[id]/_api/client';
import { editCourse } from './_api/client';

const LABEL_STYLES = {
  selected: 'text-sm px-2 font-normal font-semibold',
  unselected: 'text-sm px-2 font-normal',
};

function EditCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [shouldRender, setShouldRender] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, { message: 'Course name is required' }),
    yearStart: z
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
      await router.push(`/course/${params.id}`);
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
      //TODO: after api change
      //   form.setValue('yearStart', course.yearStart);
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const dataToSend = { ...values, iconPath: 'house' };

    editCourseInfo([parseInt(params.id), dataToSend]);
  }

  useEffect(() => {
    getPreviousCourseInfo(parseInt(params.id));
  }, [router]);

  return (
    shouldRender && (
      <>
        <div className='flex items-center justify-center mx-3 my-16'>
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Edit a Course</CardTitle>
              <CardDescription>
                Change your information about the course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4'>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <Button type='submit' className='w-full mt-2'>
                      Save
                    </Button>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    )
  );
}

export default EditCoursePage;
