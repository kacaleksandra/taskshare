import OwnedCourses from './_components/owned-courses';

const TeacherCoursesPage = async () => {
  return (
    <div className='max-w-full min-h-48'>
      <div className='max-w-full items-center flex flex-col'>
        <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>
          My owned courses
        </h2>
        <OwnedCourses />
      </div>
    </div>
  );
};

export default TeacherCoursesPage;
