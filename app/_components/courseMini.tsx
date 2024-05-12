'use client';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// const element = <FontAwesomeIcon icon={} />
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/card';
import { useRouter } from 'next/navigation';
import React from 'react';

import { CourseMiniProps } from '../dashboard/_api/client';

const CourseMini: React.FC<CourseMiniProps> = ({
  id,
  name,
  iconPath,
  owner,
}) => {
  const router = useRouter();

  return (
    <Card className='my-2' onClick={() => router.push(`/course/${id}`)}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {owner.name} {owner.lastname}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        {/* <CardDescription> */}
        {/* {year_start} */}
        {/* </CardDescription> */}
      </CardFooter>
    </Card>
  );
};

export default CourseMini;
