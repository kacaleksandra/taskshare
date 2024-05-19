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

import { registerUserClient } from './_api/client';

const LABEL_STYLES = {
  selected: 'text-sm px-2 font-normal font-semibold',
  unselected: 'text-sm px-2 font-normal',
};

function SignUpPage() {
  const router = useRouter();

  const [shouldRender, setShouldRender] = useState(false);
  const [role, setRole] = useState<boolean>(false);

  const formSchema = z
    .object({
      name: z.string().min(1, { message: 'First name is required' }),
      lastname: z.string().min(1, { message: 'Last name is required' }),
      email: z.string().email().min(1, { message: 'Invalid email' }),
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' }),
      confirmedPassword: z.string(),
      role: z.number(),
    })
    .refine(
      (values) => {
        return values.password === values.confirmedPassword;
      },
      {
        message: 'Passwords must match.',
        path: ['confirmPassword'],
      },
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      confirmedPassword: '',
      role: 3,
    },
  });

  const { mutate: register } = useMutation({
    mutationFn: registerUserClient,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async () => {
      await router.push('/success');
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const roleValue = role ? 2 : 3; //2 for teacher, 3 for student
    const dataToSend = { ...values, roleId: roleValue };

    register(dataToSend);
  }

  return (
    <>
      <div className='flex items-center justify-center mx-3 my-16'>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItemWrapper label='First name'>
                          <Input {...field} />
                        </FormItemWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='lastname'
                      render={({ field }) => (
                        <FormItemWrapper label='Last name'>
                          <Input {...field} />
                        </FormItemWrapper>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItemWrapper label='Email' className='my-4'>
                        <Input {...field} />
                      </FormItemWrapper>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItemWrapper label='Password'>
                        <Input {...field} type='password' />
                      </FormItemWrapper>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='confirmedPassword'
                    render={({ field }) => (
                      <FormItemWrapper
                        label='Confirm password'
                        className='my-4'
                      >
                        <Input {...field} type='password' />
                      </FormItemWrapper>
                    )}
                  />
                  <div className='flex flex-row items-center my-5'>
                    <Label htmlFor='role' className='text-sm'>
                      What is your role?
                    </Label>
                    <div className='flex flex-row grow items-center justify-center'>
                      <Label
                        htmlFor='role'
                        className={
                          role ? LABEL_STYLES.unselected : LABEL_STYLES.selected
                        }
                        onClick={() => setRole(true)}
                      >
                        Student
                      </Label>
                      <Switch
                        id='role'
                        checked={role}
                        onCheckedChange={() => setRole(!role)}
                      />
                      <Label
                        htmlFor='role'
                        className={
                          role ? LABEL_STYLES.selected : LABEL_STYLES.unselected
                        }
                        onClick={() => setRole(false)}
                      >
                        Teacher
                      </Label>
                    </div>
                  </div>
                  <Button type='submit' className='w-full mt-2'>
                    Create an account
                  </Button>
                </form>
              </Form>
            </div>

            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <Link href='/sign-in' className='underline'>
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default SignUpPage;
