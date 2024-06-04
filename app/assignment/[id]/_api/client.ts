import { clientFetch } from '@/app/_utils/client-fetch';

export interface AssignmentMiniProps {
  id: number;
  name: string;
  visible: boolean;
  deadlineDate: string;
  description: string;
}
export type AssigmentResponse = AssignmentMiniProps;

export const getAssignmentInfo = async (
  assignmentID: number,
): Promise<AssigmentResponse> => {
  const res = await clientFetch(`/assignment/${assignmentID}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to get assignment info');
  } else {
    return res.json();
  }
};

export type CourseFullInfo = {
  id: number;
  name: string;
  iconPath: string;
  approvalStatus: number;
  owner: unknown;
};

export const getAllSubmitions = async (
  assignmentID: number,
): Promise<CourseFullInfo> => {
  const res = await clientFetch(`/submission/byassignment/${assignmentID}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to get submissions');
  } else {
    return res.json();
  }
};
