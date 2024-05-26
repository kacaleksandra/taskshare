import { CirclePlusIcon, FileCheckIcon, UsersIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

import { Dialog, DialogTrigger } from '../_components/dialog';
import { getUserInfoServer } from '../_utils/get-user-info-server';

const TeacherDashboard = async () => {
  const userInfo = await getUserInfoServer();

  if (userInfo.roleId !== 2) redirect('/');

  return (
    <div>
      <div className='pt-10 pb-14 px-8 w-fullshadow-sm from-blue-100 to-white bg-gradient-to-b '>
        <h1 className='text-2xl font-medium mb-2 tracking-wide'>
          {' '}
          Hello {userInfo.name} {userInfo.lastname}!
        </h1>
        <h2 className='text-lg font-medium'>What do you want to do today?</h2>
      </div>
      <div className='px-8 grid md:grid-cols-3 auto-rows-fr gap-10'>
        <Dialog>
          <DialogTrigger className='text-white border border-blue-400 bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg rounded-lg px-4 py-4 justify-center flex flex-col'>
            <div>
              <h2 className='text-center font-medium text-lg'>
                <CirclePlusIcon /> Create new course
              </h2>
              <p className='py-4'>Create new course for your students.</p>
            </div>
          </DialogTrigger>
        </Dialog>
        <div className='text-white border border-blue-400 bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg rounded-lg px-4 py-4 justify-center flex flex-col'>
          <h2 className='text-center font-medium text-lg'>
            <FileCheckIcon /> Check your courses
          </h2>
          <p className='py-4'>
            See list with every course you created and edit them.
          </p>
        </div>
        <div className='text-white border border-blue-400 bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg rounded-lg px-4 py-4 justify-center flex flex-col'>
          <h2 className='text-center font-medium text-lg'>
            <UsersIcon /> Check members of your courses
          </h2>
          <p className='py-2'>See list with your courses and manage members.</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
