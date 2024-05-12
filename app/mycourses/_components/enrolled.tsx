'use client';

import { SMALL_PAGE_SIZE } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from '../../_components/button';
import CourseMini from '../../_components/courseMini';
import { Input } from '../../_components/input';
import { UseStoredUserInfo } from '../../_utils/get-user-info';
import { toast } from '../../_utils/use-toast';
import { CourseMiniProps, getEnrolledCourses } from '../_api/client';

const Enrolled: React.FC = () => {
  const [courses, setCourses] = useState<CourseMiniProps[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let searchParams: string = '';

  const { mutate: reloadCourses } = useMutation({
    mutationFn: getEnrolledCourses,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async (response) => {
      console.log(response);
      setCourses(response.items);
      setTotalPages(response.totalPages);
    },
  });

  useEffect(() => {
    console.log('Page number changed to:', pageNumber);
    reloadCourses({
      pageSize: SMALL_PAGE_SIZE,
      pageNumber: pageNumber,
      searchParams: searchParams,
    });
  }, [pageNumber, reloadCourses, searchParams]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.currentTarget.search.value);
    setPageNumber(1);
    searchParams = event.currentTarget.search.value;
    reloadCourses({
      pageSize: SMALL_PAGE_SIZE,
      pageNumber: 1,
      searchParams: event.currentTarget.search.value,
    });
  };

  return (
    <>
      <div className='max-w-full'>
        <div className='max-w-full items-center flex flex-col'>
          <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>My Courses</h2>
          <form className='w-4/5 flex' onSubmit={handleSubmit}>
            <Input type='text' placeholder='Search' name='search' />
            <Button type='submit'>Search</Button>
          </form>
          {courses.map((course) => (
            <div className='w-4/5' key={course.id}>
              <CourseMini {...course} />
            </div>
          ))}
        </div>
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
    </>
  );
};

export default Enrolled;
