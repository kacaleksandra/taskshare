'use client';

import { Button } from "@/app/_components/button";
import { UserInfoStore, useStoredUserInfo } from "@/app/_components/navigation-top-menu";
import { TEACHER_ROLE_ID } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const loggedUserInfo = useStoredUserInfo((state :UserInfoStore)=>state.loggedUserInfo);
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <div className='max-w-full'>
        <div className='max-w-full items-center flex flex-col'>
          <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>
            Course Name
            {loggedUserInfo?.roleId === TEACHER_ROLE_ID &&
             <Button variant={'destructive'} onClick={()=>{router.push(`/course/edit/${params.id}`)}}>Edit</Button>
            }
          </h2>
          {tasks.map((task) => (
            <div className='w-4/5' key={task}>
              {/* <CourseMini {...task} /> */}
            </div>
          ))}
        </div>
        {/* <div className='flex justify-center'>
          <Button variant={pageNumber > 1 ? 'default' : 'secondary'} className='m-4'
            onClick={() => {
              if (pageNumber > 1) {
                setPageNumber(pageNumber - 1);
              }
            }}
          >
            ←
          </Button>
          <span className='m-6'>
          {pageNumber} of {totalPages}
          </span>
          <Button variant={pageNumber < totalPages ? 'default' : 'secondary'} className='m-4'
            onClick={() => {
              if (pageNumber < totalPages) {
                setPageNumber(pageNumber + 1);
              }
            }}
          >
            →
          </Button>
        </div> */}
      </div>
    </>
  )
}