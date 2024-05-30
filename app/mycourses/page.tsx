import React from 'react';

import { getUserInfoServer } from '../_utils/get-user-info-server';
import Enrolled from './_components/enrolled';
import Pending from './_components/pending';

const MyCoursesPage = async () => {
  const userInfo = await getUserInfoServer();
  return (
    <>
      <div className='mt-4'>
        {/* for teacher they won't be enrolled but rather my courses*/}
        <div className='items-center flex flex-col'>
          <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>My courses</h2>
          <div className='w-full'>
            <Enrolled role={userInfo.roleId} />
          </div>
        </div>
        {userInfo.roleId !== 2 && (
          <div className='items-center flex flex-col'>
            <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>
              My pending courses
            </h2>
            <div className='w-full'>
              <Pending />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCoursesPage;
