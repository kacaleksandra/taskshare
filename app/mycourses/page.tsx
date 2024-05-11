'use client';

import React, { useEffect, useState } from 'react';

import { Button } from '../_components/button';
import CourseMini from '../_components/courseMini';
import { Input } from '../_components/input';
import { useStoredUserInfo } from '../_components/navigation-top-menu';
import { useRouter } from 'next/navigation';
import { CourseMiniProps, getEnrolledCourses } from './_api/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from '../_utils/use-toast';
import { BIG_PAGE_SIZE } from '@/constants';
import Enrolled from './enrolled';
import Pending from './pending';


const Page: React.FC = () => {
  return (<>
    <Enrolled />
    <Pending />
  </>)
};

export default Page;
