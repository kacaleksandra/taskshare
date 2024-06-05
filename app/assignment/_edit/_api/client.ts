import { clientFetch } from '@/app/_utils/client-fetch';

interface AssignmentBase {
  name: string;
  visibility: boolean;
  description: string;
  deadlineDate: string;
}
type AssignmentReturn = AssignmentBase & { id: number };

export const editAssignment = async ([id, body]: [
  number,
  AssignmentBase,
]): Promise<void> => {
  const res = await clientFetch(`/assignment/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to create assignment. Please try again later.');
  }
};

export const getAssignmentInfo = async (
  id: number,
): Promise<AssignmentReturn> => {
  const res = await clientFetch(`/assignment/${id}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to create assignment. Please try again later.');
  } else {
    return res.json();
  }
};
