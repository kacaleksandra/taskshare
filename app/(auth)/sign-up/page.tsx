'use client';

import { Button } from '@/app/_components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/card';
import { Input } from '@/app/_components/input';
import { Label } from '@/app/_components/label';
import { Switch } from '@/app/_components/switch';
import Link from 'next/link';
import { useState } from 'react';

const LABEL_STYLES = {
  selected: 'text-sm px-2 font-normal font-semibold',
  unselected: 'text-sm px-2 font-normal',
};

function SignUpPage() {
  const [role, setRole] = useState<boolean>(false);

  return (
    <div className='h-screen flex items-center justify-center mx-3'>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='first-name'>First name</Label>
                <Input id='first-name' placeholder='Max' required />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='last-name'>Last name</Label>
                <Input id='last-name' placeholder='Robinson' required />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='confirmPassword'>Confirm password</Label>
              <Input id='confirmPassword' type='password' />
            </div>
            <div className='flex flex-row items-center'>
              <Label htmlFor='role' className='text-sm'>
                What is your role?
              </Label>
              <div className='flex flex-row grow items-center justify-center'>
                <Label
                  htmlFor='role'
                  className={
                    role ? LABEL_STYLES.unselected : LABEL_STYLES.selected
                  }
                  onClick={() => setRole(false)}
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
                  onClick={() => setRole(true)}
                >
                  Teacher
                </Label>
              </div>
            </div>
            <Button type='submit' className='w-full mt-2'>
              Create an account
            </Button>
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
  );
}

export default SignUpPage;
