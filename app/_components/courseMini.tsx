'use client'
import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// const element = <FontAwesomeIcon icon={} />

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/app/_components/card"
import { useRouter } from 'next/navigation';
  
interface CourseMiniProps {
    id: number;
    name: string;
    icon_path: string;
    owner_name: string;
    year_start: number;
}

const CourseMini: React.FC<CourseMiniProps> = ({ id, name, icon_path, owner_name, year_start }) => {
    const router = useRouter();

    return (
        <Card className='my-2' onClick={() => router.push(`/course/${id}`)}>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>
                    {owner_name}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                {/* <CardDescription> */}
                    {year_start}
                {/* </CardDescription> */}
            </CardFooter>
        </Card>
    );
};

export default CourseMini;