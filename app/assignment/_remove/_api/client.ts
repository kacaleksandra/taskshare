import { clientFetch } from '@/app/_utils/client-fetch';

export const deleteAssignment = async (id: number): Promise<void> => {
  const res = await clientFetch(`/assignment/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete assignment. Please try again later.');
  } else {
    return;
  }
};
