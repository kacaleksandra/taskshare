'use client';

import { BIG_PAGE_SIZE } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { Button } from '../_components/button';
import CourseMini from '../_components/course-mini';
import { Input } from '../_components/input';
import Loader from '../_components/loader';
import { toast } from '../_utils/use-toast';
import { CourseMiniProps, getAllCourses } from './_api/client';

const Page: React.FC = () => {
  const [courses, setCourses] = useState<CourseMiniProps[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let searchParams: string = '';

  const { mutate: reloadCourses, status } = useMutation({
    mutationFn: getAllCourses,
    onError: () => {
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async (response) => {
      setCourses(response.items);
      setTotalPages(response.totalPages);
    },
  });

  useEffect(() => {
    console.log('Page number changed to:', pageNumber);
    reloadCourses({
      pageSize: BIG_PAGE_SIZE,
      pageNumber: pageNumber,
      searchParams: searchParams,
    });
  }, [pageNumber, reloadCourses, searchParams]);

  if (status !== 'success' && status !== 'error') {
    return <Loader />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.currentTarget.search.value);
    setPageNumber(1);
    searchParams = event.currentTarget.search.value;
    reloadCourses({
      pageSize: BIG_PAGE_SIZE,
      pageNumber: 1,
      searchParams: event.currentTarget.search.value,
    });
  };

  return (
    <>
      <div className='max-w-full min-h-52'>
        <div className='w-full items-center flex flex-col justify-center mt-4'>
          <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>
            All Courses
          </h2>
          {courses.length !== 0 ? (
            <div className='w-full flex items-center flex-col'>
              <form className='w-4/5 flex' onSubmit={handleSubmit}>
                <Input type='text' placeholder='Search' name='search' />
                <Button type='submit'>Search</Button>
              </form>
              {courses.map((course) => (
                <div className='w-4/5' key={course.id}>
                  <CourseMini {...course} />
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
          ) : (
            <p className='my-4 font-normal text-lg'> No courses available. </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
