'use client';

import { Button } from '@/app/_components/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/card';
import React from 'react';

import { Submission, downloadFile } from '../[id]/_api/client';

const SubmissionMini: React.FC<Submission & { downloadedFileName: string }> = ({
  id,
  user,
  files,
  studentComment,
  lastEdit,
  downloadedFileName,
}) => {
  return (
    <Card className='w-4/5'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <div className=''>
            {user.name} {user.lastname}
          </div>
          <Button
            className='px-2'
            onClick={() => {
              downloadFile({
                submissionID: id,
                fileID: files[0]?.id ?? 0,
                downloadedFileName,
              });
            }}
          >
            Download File
          </Button>
        </CardTitle>
        <CardDescription>{studentComment}</CardDescription>
      </CardHeader>
      <CardFooter>
        <CardDescription>{new Date(lastEdit).toLocaleString()}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default SubmissionMini;
