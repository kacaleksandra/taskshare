import Loader from '@/app/_components/loader';
import { SMALL_PAGE_SIZE } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from '../../_components/button';
import CourseMini from '../../_components/course-mini';
import { Input } from '../../_components/input';
import { UseStoredUserInfo } from '../../_utils/get-user-info';
import { toast } from '../../_utils/use-toast';
import { CourseMiniProps, getPendingCourses } from '../_api/client';

const Pending: React.FC = () => {
  const [courses, setCourses] = useState<CourseMiniProps[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  let searchParams: string = '';

  const { mutate: reloadCourses } = useMutation({
    mutationFn: getPendingCourses,
    onError: () => {
      setLoading(false);
      toast({ description: 'Something went wrong. Please try again.' });
    },
    onSuccess: async (response) => {
      setLoading(false);
      setCourses(response.items);
      setTotalPages(response.totalPages);
    },
  });

  useEffect(() => {
    setLoading(true);
    reloadCourses({
      pageSize: SMALL_PAGE_SIZE,
      pageNumber: pageNumber,
      searchParams: searchParams,
    });
  }, [pageNumber, reloadCourses, searchParams]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
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
          <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>
            My pending courses
          </h2>
          {loading && <Loader />}{' '}
          {!loading && (
            <>
              {courses.length === 0 && (
                <div className='flex items-center flex-col my-8 '>
                  <p className='text-center text-lg'>
                    No pending courses found.
                  </p>
                </div>
              )}
              {courses.length > 0 && (
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

export default Pending;
