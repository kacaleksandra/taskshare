import { clientFetch } from '@/app/_utils/client-fetch';

interface CourseBase {
  name?: string;
  yearStart?: number;
  iconPath?: string;
}
type CourseReturn = CourseBase & { id: number };

export const editCourse = async ([id, body]: [
  number,
  CourseBase,
]): Promise<void> => {
  const res = await clientFetch(`/course/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('Failed to edit a course');
  } else {
    return;
  }
};
