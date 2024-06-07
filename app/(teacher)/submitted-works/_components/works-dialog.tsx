'use client';

import { DialogContent, DialogTitle } from '@/app/_components/dialog';
import Loader from '@/app/_components/loader';
import { ScrollArea } from '@/app/_components/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { getSubmittedWorks } from '../_api/client';

export interface File {
  id: number;
  fileName: string;
}

export interface UserInfo {
  id: number;
  name: string;
  lastname: string;
  roleId: number;
  statusId: number;
}

export interface AssignmentInfo {
  files: File[];
  id: number;
  lastEdit: Date;
  studentComment: string;
  submissionDateTime: Date;
  user: UserInfo;
}

function WorksDialog({
  assignmentId,
  isOpen,
  queryKey,
}: {
  assignmentId: number;
  isOpen: boolean;
  queryKey?: string;
}) {
  const { data, isPending } = useQuery<AssignmentInfo[]>({
    queryKey: ['submissions'],
    queryFn: () => getSubmittedWorks(assignmentId),
    enabled: isOpen,
  });

  console.log(data);

  return (
    <DialogContent className='flex items-center flex-col justify-center py-12 gap-6'>
      <DialogTitle className='text-xl'>Check works</DialogTitle>
      <div className='w-full'>
        {isPending && <Loader />}
        {data && !isPending && data.length === 0 ? (
          <p>No submissions.</p>
        ) : (
          <ScrollArea className='max-h-64'>
            {data?.map((submission) => (
              <div
                key={submission.id}
                className='flex flex-row justify-between border-b border-gray-300 py-1'
              >
                <div className='w-3/12'>
                  <p>
                    {submission.user.name} {submission.user.lastname}
                  </p>
                </div>
                <div className='w-5/12 text-center'>
                  <p>{submission.studentComment}</p>
                  <p className='text-gray-400 text-sm pt-1'>
                    {format(submission.lastEdit, 'dd-MM-yyyy HH:mm')}
                  </p>
                </div>
                {/* add downloading this files */}
                <div className='w-4/12  text-right'>
                  {submission.files.map((file) => (
                    <p key={file.id}>{file.fileName}</p>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
    </DialogContent>
  );
}

export default WorksDialog;
