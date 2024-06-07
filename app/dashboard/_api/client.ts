import { clientFetch } from '@/app/_utils/client-fetch';

interface FilterParams {
  searchParams?: string;
  pageSize: number;
  pageNumber: number;
}
export interface CourseMiniProps {
  id: number;
  name: string;
  iconPath: string;
  approvalStatus: number;
  queryKey?: string;
  yearStart: number;
  roleId: number;
  owner: {
    id: number;
    email: string;
    name: string;
    lastname: string;
    roleId: number;
  };
}
export type CourseResponse = {
  items: CourseMiniProps[];
  totalPages: number;
  itemsFrom: number;
  itemsTo: number;
  totalItemsCount: number;
};

export const getAllCourses = async (
  params: FilterParams,
): Promise<CourseResponse> => {
  const { searchParams, pageSize, pageNumber } = params;
  const queryParams = new URLSearchParams({
    PageSize: pageSize.toString(),
    PageNumber: pageNumber.toString(),
    SearchPhrase: searchParams || '',
  });

  const res = await clientFetch(`/course?${queryParams}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to get courses');
  } else {
    return res.json();
  }
};

export const sendRequestToJoinCourse = async (courseId: number) => {
  const res = await clientFetch(`/course/join/${courseId}`, {
    method: 'PUT',
  });

  if (!res.ok) {
    throw new Error('Failed to send request');
  }
};
