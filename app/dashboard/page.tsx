'use client';

import { SMALL_PAGE_SIZE } from '@/constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { UserInfo, getUserInfo } from '../(auth)/sign-in/_api/client';
import { Button } from '../_components/button';
import { Input } from '../_components/input';
import Loader from '../_components/loader';
import { CourseResponse, getAllCourses } from './_api/client';
import CourseCard from './_components/course-card';

const Page: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState<string>('');
  const queryClient = useQueryClient();

  const { data: userInfo, isPending: userInfoIsPending } = useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  const { data: courses, isPending } = useQuery<CourseResponse>({
    queryKey: ['allCourses', pageNumber, searchParams],
    queryFn: () =>
      getAllCourses({
        pageSize: SMALL_PAGE_SIZE,
        pageNumber,
        searchParams,
      }),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(event.target.value);
    queryClient.invalidateQueries({ queryKey: ['allCourses'] });
    console.log(courses);
    setTotalPages(courses?.totalPages || 1);
    setPageNumber(1);
  };

  useEffect(() => {
    setTotalPages(courses?.totalPages || 1);
  }, [courses]);

  return (
    <>
      <div className='max-w-full min-h-52'>
        <div className='w-full items-center flex flex-col justify-center mt-4'>
          <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>
            All Courses
          </h2>
          <form className='w-4/5 flex' onSubmit={(e) => e.preventDefault()}>
            <Input
              type='text'
              placeholder='Search'
              name='search'
              value={searchParams}
              onChange={handleChange}
            />
          </form>
          {(isPending || userInfoIsPending) && <Loader />}
          {!isPending && !userInfoIsPending && courses && userInfo && (
            <>
              {courses?.items.length === 0 && (
                <div className='flex items-center flex-col my-8'>
                  <p className='text-center text-lg'>No courses found.</p>
                </div>
              )}
              {courses?.items.length > 0 && (
                <div className='w-full flex items-center flex-col'>
                  {courses?.items.map((course) => (
                    <div className='w-4/5' key={course.id}>
                      <CourseCard
                        {...course}
                        queryKey='allCourses'
                        roleId={userInfo.roleId}
                      />
                    </div>
                  ))}
                  <div className='flex justify-center'>
                    <Button
                      variant={pageNumber > 1 ? 'default' : 'secondary'}
                      className='m-4'
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
                    <Button
                      variant={
                        pageNumber < totalPages ? 'default' : 'secondary'
                      }
                      className='m-4'
                      onClick={() => {
                        if (pageNumber < totalPages) {
                          setPageNumber(pageNumber + 1);
                        }
                      }}
                    >
                      →
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
