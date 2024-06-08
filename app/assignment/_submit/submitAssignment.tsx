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
import { toast } from '@/app/_utils/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { Dispatch } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { makeSubmission, submitFiles } from './_api/client';

const formSchema = z.object({
  studentComment: z.string(),
  requestFiles: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size < 50 * 1024 * 1024,
          'File size must be less than 50MB',
        ),
    )
    .min(1, 'At least one file is required')
    .refine(
      (files) => files.every((file) => file.size < 50 * 1024 * 1024),
      'File size must be less than 50MB',
    ),
});

type FormData = z.infer<typeof formSchema>;

const SubmitAssignment = ({
  onOpenChange,
  assignmentID,
  queryKey,
}: {
  onOpenChange?: Dispatch<React.SetStateAction<boolean>>;
  assignmentID: number;
  queryKey: string;
}) => {
  const queryClient = useQueryClient();
  const onSubmit = (data: FormData) => {
    // Submit data to API
    submitAssignmentNew({ assignmentID, studentComment: data.studentComment });

    //to bedzie trzeba dac na onSuccess w mutacji
    if (onOpenChange) onOpenChange(false);
  };

  const { mutate: submitAssignmentNew } = useMutation({
    mutationFn: makeSubmission,
    onError: () => {
      toast({
        description: 'Failed to make new submission, please try again later.',
      });
    },
    onSuccess: async (response) => {
      submitFilesNew({
        submissionID: response,
        files: form.getValues().requestFiles,
      });
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const { mutate: submitFilesNew } = useMutation({
    mutationFn: submitFiles,
    onError: () => {
      toast({
        description: 'Failed to submit files, please try again later.',
      });
    },
    onSuccess: async () => {
      onOpenChange?.(false);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentComment: '',
      requestFiles: [],
    },
  });

  return (
    <>
      <div className='flex items-center flex-col gap-8 justify-center my-6'>
        <h2 className='text-xl font-semibold'>Submit your assignment</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button type='submit' className='w-full mt-6' size='lg'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SubmitAssignment;
