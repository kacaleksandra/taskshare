'use client';

import { getAllAssignments } from '@/app/course/[id]/_api/client';
import { useQuery } from '@tanstack/react-query';

import AssignmentCard from '../../_components/assignment-card';

const TeacherSubmittedWorksAssignmentsPage = ({
  params,
}: {
  params: { id: string };
}) => {
  console.log(params.id);
  const { data: tasks, isPending: tasksAreLoading } = useQuery({
    queryKey: ['assignments'],
    queryFn: () => getAllAssignments(parseInt(params.id)),
  });

  return (
    <div className='max-w-full min-h-48 pt-6'>
      <div className='max-w-full items-center flex flex-col'>
        <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>
          Manage submitted works
        </h2>
        <div className='w-full items-center flex flex-col'>
          {tasks?.map((task) => (
            <div className='w-4/5 cursor-pointer' key={task.id}>
              <AssignmentCard {...task} queryKey='tasks' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherSubmittedWorksAssignmentsPage;
