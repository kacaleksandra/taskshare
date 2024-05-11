'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

// import { useRouter } from 'next/router';

const CoursePage = () => {
  // const router = useRouter();
  const [courseID, setCourseID] = useState<string | null>(
    useSearchParams().get('id'),
  );
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  // setCourseID(id);
  // Fetch course data using id here

  return (
    <div>
      <h1>Course {courseID}</h1>
      {/* Render course data here */}
    </div>
  );
};

export default CoursePage;
