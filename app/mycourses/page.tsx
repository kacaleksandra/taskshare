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
        <Enrolled role={userInfo.roleId} />
        {userInfo.roleId !== 2 && <Pending />}
      </div>
    </>
  );
};

export default MyCoursesPage;
