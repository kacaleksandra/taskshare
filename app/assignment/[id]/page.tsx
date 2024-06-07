'use client';

import { Button } from '@/app/_components/button';
import { Card } from '@/app/_components/card';
import Loader from '@/app/_components/loader';
import { toast } from '@/app/_utils/use-toast';
import { UseStoredUserInfo } from '@/app/_utils/zustand';
import { STUDENT_ROLE_ID, TEACHER_ROLE_ID } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import SubmissionMini from '../_components/submissionMini';
import UpdateAssignment from '../_submit/updateAssignment';
import {
  AssignmentMiniProps,
  Submission,
  getAllSubmitions,
  getAssignmentInfo,
  getMySubmitions,
} from './_api/client';

export default function Page({ params }: { params: { id: string } }) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const loggedUserInfo = UseStoredUserInfo((state) => state.loggedUserInfo);
  const [assignmentInfo, setAssignmentInfo] =
    useState<AssignmentMiniProps | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const { mutate: loadAllSubmisions } = useMutation({
    mutationFn: getAllSubmitions,
    onError: () => {
      toast({
        description: 'Failed to load submisions, please try again later.',
      });
    },
    onSuccess: async (response) => {
      setSubmissions(response);
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
      if (loggedUserInfo?.roleId === TEACHER_ROLE_ID) {
        setIsVisible(true);
      }
      if (loggedUserInfo?.roleId === STUDENT_ROLE_ID) {
        loadMySubmission(response.submissionId ?? 0);
      }
    },
  });

  const { mutate: loadMySubmission } = useMutation({
    mutationFn: getMySubmitions,
    onError: () => {
      toast({
        description: 'Failed to load assignment info, please try again later.',
      });
      router.push('/dashboard');
    },
    onSuccess: async (response) => {
      setSubmissions([response]);
      setIsVisible(true);
    },
  });

  useEffect(() => {
    if (loggedUserInfo?.roleId === TEACHER_ROLE_ID) {
      loadAllSubmisions(parseInt(params.id));
    }
    loadAssignmentInfo(parseInt(params.id));
  }, [
    loadAllSubmisions,
    loadAssignmentInfo,
    loggedUserInfo?.roleId,
    params.id,
  ]);

  return (
    <>
      {isVisible ? (
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='w-4/5 flex items-center justify-between'>
            <h2 className='text-left text-4xl my-8 font-bold'>
              {assignmentInfo?.name}
            </h2>
          </div>
          {loggedUserInfo?.roleId === TEACHER_ROLE_ID && (
            <div className='w-full items-center flex flex-col'>
              <h3 className='w-4/5 text-left text-2xl m-4 font-bold'>
                Submissions
              </h3>
              {submissions.map((submision) => (
                <SubmissionMini
                  key={submision.id}
                  {...submision}
                  downloadedFileName={`${submision.user.name}_${submision.user.name}_${params.id}`}
                />
              ))}
            </div>
          )}
          {loggedUserInfo?.roleId === STUDENT_ROLE_ID && (
            <>
              <div className='w-full items-center flex flex-col'>
                {submissions.map((submision) => (
                  <SubmissionMini
                    key={submision.id}
                    {...submision}
                    downloadedFileName={`Assignment_${params.id}`}
                  />
                ))}
              </div>
              <Card className='p-10 my-10'>
                <UpdateAssignment
                  studentComment={submissions[0].studentComment}
                  fileID={submissions[0].files[0]?.id ?? 0}
                  submissionID={submissions[0].id}
                />
              </Card>
            </>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
