'use client';

import Loader from '@/app/_components/loader';
import { SMALL_PAGE_SIZE } from '@/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { Button } from '../../_components/button';
import CourseMini from '../../_components/course-mini';
import { Input } from '../../_components/input';
import { toast } from '../../_utils/use-toast';
import {
  CourseMiniProps,
  CourseResponse,
  getPendingCourses,
} from '../_api/client';

const Pending: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState<string>('');
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<CourseResponse>({
    queryKey: ['myPendingCourses', pageNumber, searchParams],
    queryFn: () =>
      getPendingCourses({
        pageSize: SMALL_PAGE_SIZE,
        pageNumber,
        searchParams,
      }),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(event.target.value);
    queryClient.invalidateQueries({ queryKey: ['myPendingCourses'] });
    setTotalPages(data?.totalPages || 1);
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
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
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Pending;
