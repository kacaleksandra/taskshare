'use client';

import { Button } from '@/app/_components/button';
import Loader from '@/app/_components/loader';
import { UseStoredUserInfo, UserInfoStore } from '@/app/_utils/get-user-info';
import { toast } from '@/app/_utils/use-toast';
import AssignmentMini from '@/app/assignment/_components/assignmentMini';
import { TEACHER_ROLE_ID } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import {
  AssignmentMiniProps,
  CourseFullInfo,
  getAllAssignments,
  getCourseInfo,
} from './_api/client';

export default function Page({ params }: { params: { id: string } }) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const loggedUserInfo = UseStoredUserInfo(
    (state: UserInfoStore) => state.loggedUserInfo,
  );
  const [tasks, setTasks] = useState<AssignmentMiniProps[]>([]);
  const [courseInfo, setCourseInfo] = useState<CourseFullInfo | null>(null);
  const { mutate: loadAllAssignments } = useMutation({
    mutationFn: getAllAssignments,
    onError: () => {
      toast({
        description: 'Failed to load assignments, please try again later.',
      });
    },
    onSuccess: async (response) => {
      setTasks(response);
    },
  });
  useEffect(() => {
    loadAllAssignments(parseInt(params.id));
    loadCourseInfo(parseInt(params.id));
  }, [params.id]);

  const { mutate: loadCourseInfo } = useMutation({
    mutationFn: getCourseInfo,
    onError: () => {
      toast({
        description: 'You do not have access to this course.',
      });
      router.push('/dashboard');
    },
    onSuccess: async (response) => {
      setCourseInfo(response);
      setIsVisible(true);
    },
  });

  useMemo(() => {
    loadAllAssignments(parseInt(params.id));
  }, [params.id, loadAllAssignments]);

  return (
    <>
      {isVisible ? (
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='w-4/5 flex items-center justify-between'>
            <h2 className='text-left text-4xl my-8 font-bold'>
              {courseInfo?.name}
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
          <div className='w-full items-center flex flex-col'>
            <h3 className='w-4/5 text-left text-2xl m-4 font-bold'>
              Assignments:
            </h3>
            {tasks.map((task) => (
              <div className='w-4/5 cursor-pointer' key={task.id}>
                <AssignmentMini {...task} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
}
