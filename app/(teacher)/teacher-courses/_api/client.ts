import { clientFetch } from '@/app/_utils/client-fetch';

export const deleteCourseClient = async (courseID: number) => {
  const res = await clientFetch(`/course/${courseID}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete assignments');
  }
};
