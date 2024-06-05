'use client';

import { Button } from '@/app/_components/button';
import { Dialog, DialogTrigger } from '@/app/_components/dialog';
import Loader from '@/app/_components/loader';
import { UseStoredUserInfo, UserInfoStore } from '@/app/_utils/zustand';
import AssignmentMini from '@/app/assignment/_components/assignmentMini';
import CreateAssignment from '@/app/assignment/_create/create-assignment';
import { TEACHER_ROLE_ID } from '@/constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import EditCourse from '../_edit/edit-course';
import {
  CourseFullInfo,
  getAllAssignments,
  getCourseInfo,
} from './_api/client';

export default function Page({ params }: { params: { id: string } }) {
  const [isOpenEditCourse, setIsOpenEditCourse] = useState(false);
  const [isOpenAddAssignment, setIsOpenAddAssignment] = useState(false);

  const loggedUserInfo = UseStoredUserInfo(
    (state: UserInfoStore) => state.loggedUserInfo,
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.clear();
  }, []);

  const { data: tasks, isPending: tasksAreLoading } = useQuery({
    queryKey: ['assignments'],
    queryFn: () => getAllAssignments(parseInt(params.id)),
  });

  const { data: courseInfo, isPending } = useQuery<CourseFullInfo>({
    queryKey: ['courseInfo'],
    queryFn: () => getCourseInfo(parseInt(params.id)),
  });

  return (
    <>
      {tasks !== undefined && courseInfo !== undefined ? (
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='w-4/5 flex items-center justify-between'>
            <h2 className='text-left text-4xl my-8 font-bold'>
              {courseInfo?.name}
            </h2>
            {loggedUserInfo?.roleId === TEACHER_ROLE_ID && (
              <Dialog
                open={isOpenEditCourse}
                onOpenChange={setIsOpenEditCourse}
              >
                <DialogTrigger asChild>
                  <Button variant={'outline'} className='px-8'>
                    Edit
                  </Button>
                </DialogTrigger>
                <EditCourse
                  courseId={parseInt(params.id)}
                  onOpenChange={setIsOpenEditCourse}
                  queryKey='courseInfo'
                />
              </Dialog>
            )}
          </div>
          <div className='w-full items-center flex flex-col'>
            <div className='w-4/5 flex items-center justify-between'>
              <h3 className='w-4/5 text-left text-2xl m-4 font-bold'>
                Assignments:
              </h3>
              {loggedUserInfo?.roleId === TEACHER_ROLE_ID && (
                <Dialog
                  open={isOpenAddAssignment}
                  onOpenChange={setIsOpenAddAssignment}
                >
                  <DialogTrigger asChild>
                    <Button variant={'outline'} className='px-8'>
                      Create Assignment
                    </Button>
                  </DialogTrigger>
                  <CreateAssignment
                    courseId={params.id}
                    onOpenChange={setIsOpenAddAssignment}
                    queryKey='assignments'
                  />
                </Dialog>
              )}
            </div>
            {tasks?.map((task) => (
              <div className='w-4/5 cursor-pointer' key={task.id}>
                <AssignmentMini {...task} queryKey='assignments' />
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
