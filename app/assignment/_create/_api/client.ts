import { clientFetch } from '@/app/_utils/client-fetch';

interface AssignmentBase {
  name: string;
  visibility: boolean;
  description: string;
  deadlineDate: string;
  courseId: number;
}
type CourseReturn = AssignmentBase & { id: number };

export const createAssignment = async (body: AssignmentBase): Promise<void> => {
  console.log(body);
  const res = await clientFetch(`/assignment`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('Failed to create assignment. Please try again later.');
  } else {
    return;
  }
};
