import { clientFetch } from '@/app/_utils/client-fetch';

interface CourseBase {
  name: string;
  yearStart: number;
  iconPath: string;
}
type CourseReturn = CourseBase & { id: number };

export const createCourse = async (body: CourseBase): Promise<CourseReturn> => {
  const res = await clientFetch(`/course`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('Failed to create a course');
  } else {
    return res.json();
  }
};
