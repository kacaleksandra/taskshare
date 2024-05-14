'use client';

import { Button } from '@/app/_components/button';
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
    },
    onSuccess: async (response) => {
      setAssignmentInfo(response);
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
      <div className='max-w-full'>
        <div className='max-w-full items-center flex flex-col'>
          <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>
            {assignmentInfo?.name}
            {loggedUserInfo?.roleId === TEACHER_ROLE_ID && (
              <Button
                variant={'destructive'}
                onClick={() => {
                  router.push(`/assignment/edit/${params.id}`);
                }}
              >
                Edit
              </Button>
            )}
          </h2>
          {loggedUserInfo?.roleId === TEACHER_ROLE_ID && (
            <>
              <h3 className='w-4/5 text-left text-2xl m-4 font-bold'>
                Submissions
              </h3>
              {submissions.map(
                (submision) => JSON.stringify(submision),
                // <div className='w-4/5' key={task.id}>
                //   <AssignmentMini {...task} />
                // </div>
              )}
            </>
          )}
          {loggedUserInfo?.roleId === STUDENT_ROLE_ID && <SubmitAssignment />}
        </div>
      </div>
    </>
  );
}
