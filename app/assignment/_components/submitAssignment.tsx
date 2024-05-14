import { Button } from '@/app/_components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/_components/card';
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
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
    <>
      <div className='flex items-center justify-center mx-3 my-16'>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>Submit your work</CardTitle>
          </CardHeader>
          <CardContent>
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
                          multiple // Allow multiple file selection
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <Button type='submit' className='w-full mt-4'>
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SubmitAssignment;
