import ManageWorksList from './_components/manage-works-list';

const TeacherSubmittedWorksPage = async () => {
  return (
    <div className='max-w-full min-h-48 pt-6'>
      <div className='max-w-full items-center flex flex-col'>
        <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>
          Manage submitted works
        </h2>
        <ManageWorksList />
      </div>
    </div>
  );
};

export default TeacherSubmittedWorksPage;
