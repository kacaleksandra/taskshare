'use client';

import { Button } from '@/app/_components/button';
import {
  UserInfoStore,
  UseStoredUserInfo,
} from '@/app/_utils/get-user-info';
import { toast } from '@/app/_utils/use-toast';
import { TEACHER_ROLE_ID } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AssignmentMiniProps, CourseFullInfo, getAllAssignments, getCourseInfo } from './_api/client';
import AssignmentMini from '@/app/assignment/_components/assignmentMini';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const loggedUserInfo = UseStoredUserInfo(
    (state: UserInfoStore) => state.loggedUserInfo,
  );
  const [tasks, setTasks] = useState<AssignmentMiniProps[]>([]);
  const [courseInfo, setCourseInfo] = useState<CourseFullInfo|null>(null);
  const { mutate: loadAllAssignments } = useMutation({
    mutationFn: getAllAssignments,
    onError: () => {
      toast({ description: 'Failed to load assignments, please try again later.' });
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
      toast({ description: 'Failed to load assignments, please try again later.' });
    },
    onSuccess: async (response) => {
      setCourseInfo(response);
    },
  });
  useEffect(() => {
    loadAllAssignments(parseInt(params.id));
  }, [params.id, loadAllAssignments]);
  return (
    <>
      <div className='max-w-full'>
        <div className='max-w-full items-center flex flex-col'>
          <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>
            {courseInfo?.name}
            {loggedUserInfo?.roleId === TEACHER_ROLE_ID && (
              <Button
                variant={'destructive'}
                onClick={() => {
                  router.push(`/course/edit/${params.id}`);
                }}
              >
                Edit
              </Button>
            )}
          </h2>
          <h3 className='w-4/5 text-left text-2xl m-4 font-bold'>Assignments:
          </h3>
          {tasks.map((task) => (
            <div className='w-4/5' key={task.id}>
              <AssignmentMini {...task} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
