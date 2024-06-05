import ManageMembersList from './_components/manage-members-list';

const TeacherManageMembersPage = async () => {
  return (
    <div className='max-w-full min-h-48 pt-6'>
      <div className='max-w-full items-center flex flex-col'>
        <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>
          Manage members
        </h2>
        <ManageMembersList />
      </div>
    </div>
  );
};

export default TeacherManageMembersPage;
