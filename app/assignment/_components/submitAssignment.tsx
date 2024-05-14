import { Button } from '@/app/_components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/form';
import { Input } from '@/app/_components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  studentComment: z.string().nonempty(),
  requestFiles: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size < 2 * 1024 * 1024,
          'File size must be less than 2MB',
        ),
    )
    .min(1, 'At least 1 file is required')
    .refine(
      (files) => files.every((file) => file.size < 2 * 1024 * 1024),
      'File size must be less than 2MB',
    ),
});

type FormData = z.infer<typeof formSchema>;

const SubmitAssignment: React.FC = () => {
  const onSubmit = (data: FormData) => {
    // Submit data to API
    console.log(data);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentComment: '',
      requestFiles: [],
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name='studentComment'
          control={form.control}
          render={({ field }) => (
            <FormItem className='md:col-span-4 col-span-1'>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          name='requestFiles'
          control={form.control}
          render={({ field }) => (
            <FormItem className='md:col-span-4 col-span-1'>
              <FormLabel>Attach Files</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  onChange={(e) => {
                    const filesArray = Array.from(e.target.files || []);
                    field.onChange(filesArray);
                  }}
                  multiple // Allow multiple file selection
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default SubmitAssignment;
