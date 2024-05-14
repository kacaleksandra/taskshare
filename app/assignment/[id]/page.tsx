'use client';

import { Button } from '@/app/_components/button';
import Loader from '@/app/_components/loader';
import { UseStoredUserInfo } from '@/app/_utils/get-user-info';
import { toast } from '@/app/_utils/use-toast';
import { STUDENT_ROLE_ID, TEACHER_ROLE_ID } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import SubmitAssignment from '../_components/submitAssignment';
import {
  AssignmentMiniProps,
  getAllSubmitions,
  getAssignmentInfo,
} from './_api/client';

export default function Page({ params }: { params: { id: string } }) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const loggedUserInfo = UseStoredUserInfo((state) => state.loggedUserInfo);
  const [assignmentInfo, setAssignmentInfo] =
    useState<AssignmentMiniProps | null>(null);
  const [submissions, setSubmissions] = useState<[]>([]);

  const { mutate: loadAllSubmisions } = useMutation({
    mutationFn: getAllSubmitions,
    onError: () => {
      toast({
        description: 'Failed to load submisions, please try again later.',
      });
    },
    onSuccess: async (response) => {
      setSubmissions([]);
    },
  });
  const { mutate: loadAssignmentInfo } = useMutation({
    mutationFn: getAssignmentInfo,
    onError: () => {
      toast({
        description: 'Failed to load assignment info, please try again later.',
      });
      router.push('/dashboard');
    },
    onSuccess: async (response) => {
      setAssignmentInfo(response);
      setIsVisible(true);
    },
  });

  useEffect(() => {
    if (loggedUserInfo?.roleId === TEACHER_ROLE_ID) {
      loadAllSubmisions(parseInt(params.id));
    }
    loadAssignmentInfo(parseInt(params.id));
  }, [params.id]);

  return (
    <>
      {isVisible ? (
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='w-4/5 flex items-center justify-between'>
            <h2 className='text-left text-4xl my-8 font-bold'>
              {assignmentInfo?.name}
            </h2>
            {loggedUserInfo?.roleId === TEACHER_ROLE_ID && (
              <Button
                variant={'destructive'}
                className='px-8'
                onClick={() => {
                  router.push(`/course/edit/${params.id}`);
                }}
              >
                Edit
              </Button>
            )}
          </div>
          {loggedUserInfo?.roleId === TEACHER_ROLE_ID && (
            <div className='w-full items-center flex flex-col'>
              <h3 className='w-4/5 text-left text-2xl m-4 font-bold'>
                Submissions
              </h3>
              {submissions.map(
                (submision) => JSON.stringify(submision),
                // <div className='w-4/5' key={task.id}>
                //   <AssignmentMini {...task} />
                // </div>
              )}
            </div>
          )}
          {loggedUserInfo?.roleId === STUDENT_ROLE_ID && <SubmitAssignment />}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
