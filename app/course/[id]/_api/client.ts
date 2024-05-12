import { clientFetch } from '@/app/_utils/client-fetch';

export interface AssignmentMiniProps {
  id: number;
  name: string;
  visible: boolean;
  deadlineDate: string;
  description: string;
}
export type AssigmentResponse = AssignmentMiniProps[];


export const getAllAssignments = async (
  courseID: number,
): Promise<AssigmentResponse> => {

  const res = await clientFetch(`/assignment/bycourse/${courseID}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to get assignments');
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
}

export const getCourseInfo = async (
  courseID: number,
): Promise<CourseFullInfo> => {

  const res = await clientFetch(`/course/${courseID}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to get assignments');
  } else {
    return res.json();
  }
};