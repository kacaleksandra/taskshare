'use client';

import { Button } from '@/app/_components/button';
import { Input } from '@/app/_components/input';
import Loader from '@/app/_components/loader';
import {
  CourseResponse,
  getMyCoursesTeacher,
} from '@/app/mycourses/_api/client';
import { SMALL_PAGE_SIZE } from '@/constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import CourseCard from './course-card';

const OwnedCourses = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState<string>('');
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<CourseResponse>({
    queryKey: ['myOwnedCourses', pageNumber, searchParams],
    queryFn: () =>
      getMyCoursesTeacher({
        pageSize: SMALL_PAGE_SIZE,
        pageNumber,
        searchParams,
      }),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(event.target.value);
    queryClient.invalidateQueries({ queryKey: ['myOwnedCourses'] });
    setTotalPages(data?.totalPages || 1);
  };

  return (
    <>
      <form className='w-4/5 flex' onSubmit={(e) => e.preventDefault()}>
        <Input
          type='text'
          placeholder='Search'
          name='search'
          value={searchParams}
          onChange={handleChange}
        />
      </form>
      {isPending && <Loader />}
      {!isPending && (
        <>
          {data?.items.length === 0 && (
            <div className='flex items-center flex-col my-8 '>
              <p className='text-center text-lg'>No courses found.</p>
            </div>
          )}
          {data !== undefined && data.items.length > 0 && (
            <div className='w-full flex items-center flex-col'>
              {data?.items.map((course) => (
                <div className='w-4/5 cursor-pointer' key={course.id}>
                  <CourseCard {...course} />
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
                  variant={pageNumber < totalPages ? 'default' : 'secondary'}
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
    </>
  );
};

export default OwnedCourses;
