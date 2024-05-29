import { clientFetch } from '@/app/_utils/client-fetch';

interface CreateCourseDto {
  courseName: string;
  courseStartYear: number;
}

export async function createCourseClient(values: CreateCourseDto) {
  const objToSend = {
    name: values.courseName,
    iconPath: '',
    yearStart: values.courseStartYear,
  };

  const res = await clientFetch('/course', {
    method: 'POST',
    body: JSON.stringify(objToSend),
  });

  if (!res.ok) {
    throw new Error('Failed to create course');
  }
}
