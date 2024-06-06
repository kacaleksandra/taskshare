import { clientFetch } from '@/app/_utils/client-fetch';

import { AssignmentInfo } from '../_components/works-dialog';

export async function getSubmittedWorks(assignmentId: number) {
  const response = await clientFetch(
    `/submission/byassignment/${assignmentId}`,
  );

  if (response && response.ok) {
    return (await response.json()) as AssignmentInfo[];
  } else {
    throw new Error('Error fetching submitted works');
  }
}
