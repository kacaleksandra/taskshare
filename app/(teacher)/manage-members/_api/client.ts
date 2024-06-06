import { clientFetch } from '@/app/_utils/client-fetch';

export const getCourseMembers = async (courseID: number) => {
  const res = await clientFetch(`/course/members/${courseID}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to get assignments');
  } else {
    return res.json();
  }
};

export const acceptStudentClient = async (courseID: number, userId: number) => {
  const res = await clientFetch(`/course/accept`, {
    method: 'PUT',
    body: JSON.stringify({ courseId: courseID, userId: userId }),
  });

  if (!res.ok) {
    throw new Error('Failed to accept student');
  }
};

export const removeStudentClient = async (courseID: number, userId: number) => {
  const res = await clientFetch(`/course/remove`, {
    method: 'PUT',
    body: JSON.stringify({ courseId: courseID, userId: userId }),
  });

  if (!res.ok) {
    throw new Error('Failed to remove student');
  }
};
