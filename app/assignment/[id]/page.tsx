'use client';

import { Button } from '@/app/_components/button';
import { Card } from '@/app/_components/card';
import Loader from '@/app/_components/loader';
import { UseStoredUserInfo } from '@/app/_utils/zustand';
import { STUDENT_ROLE_ID, TEACHER_ROLE_ID } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import SubmissionMini from '../_components/submissionMini';
import UpdateAssignment from '../_submit/updateAssignment';
import {
  AssignmentMiniProps,
  Submission,
  downloadAllSubmissions,
  getAllSubmitions,
  getAssignmentInfo,
  getMySubmitions,
} from './_api/client';

export default function Page({ params }: { params: { id: string } }) {
  const [isVisible, setIsVisible] = useState(false);
  const loggedUserInfo = UseStoredUserInfo((state) => state.loggedUserInfo);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const { data: assignmentInfo, isPending: assignmentInfoIsPending } =
    useQuery<AssignmentMiniProps | null>({
      queryKey: ['assignmentInfo'],
      queryFn: () => getAssignmentInfo(parseInt(params.id)),
    });

  const { data: allSubmissions } = useQuery<Submission[]>({
    queryKey: ['allSubmissions'],
    queryFn: () => getAllSubmitions(parseInt(params.id)),
    enabled: loggedUserInfo?.roleId === TEACHER_ROLE_ID,
  });

  const { data: mySubmissions } = useQuery<Submission[]>({
    queryKey: ['mySubmissions'],
    queryFn: async () => {
      const submission = await getMySubmitions(
        assignmentInfo?.submissionId ?? 0,
      );
      return submission ? [submission] : [];
    },
    enabled:
      loggedUserInfo?.roleId !== TEACHER_ROLE_ID && !assignmentInfoIsPending,
  });

  useEffect(() => {
    if (loggedUserInfo?.roleId === TEACHER_ROLE_ID) {
      setSubmissions(allSubmissions || []);
      setIsVisible(true);
    } else {
      setSubmissions(mySubmissions || []);
      setIsVisible(true);
    }
  }, [allSubmissions, mySubmissions, loggedUserInfo?.roleId]);

  return (
    <>
      {!assignmentInfoIsPending && isVisible ? (
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='w-4/5 flex items-center justify-between'>
            <h2 className='text-left text-4xl my-8 font-bold'>
              {assignmentInfo?.name}
            </h2>
          </div>
          {loggedUserInfo?.roleId === TEACHER_ROLE_ID && (
            <div className='w-full items-center flex flex-col'>
              <div className='flex justify-between w-4/5 items-center'>
                <h3 className='w-4/5 text-left text-2xl m-4 font-bold'>
                  Submissions
                </h3>
                {submissions.length > 0 && (
                  <Button
                    onClick={() =>
                      assignmentInfo &&
                      downloadAllSubmissions(
                        assignmentInfo.id,
                        assignmentInfo.name,
                      )
                    }
                  >
                    Download submissions
                  </Button>
                )}
              </div>
              {submissions.map((submission) => (
                <SubmissionMini
                  key={submission.id}
                  {...submission}
                  downloadedFileName={`${submission.user.name}_${submission.user.lastname}_${params.id}`}
                />
              ))}
            </div>
          )}
          {loggedUserInfo?.roleId === STUDENT_ROLE_ID && (
            <>
              <div className='w-full items-center flex flex-col'>
                {submissions.map((submission) => (
                  <SubmissionMini
                    key={submission.id}
                    {...submission}
                    downloadedFileName={`Assignment_${params.id}`}
                  />
                ))}
              </div>
              <Card className='p-10 my-10'>
                {submissions[0] && (
                  <UpdateAssignment
                    studentComment={submissions[0].studentComment}
                    fileID={submissions[0].files[0]?.id ?? 0}
                    submissionID={submissions[0].id}
                    queryKey='mySubmissions'
                  />
                )}
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
