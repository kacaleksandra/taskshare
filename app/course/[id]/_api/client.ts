import { clientFetch } from '@/app/_utils/client-fetch';

export interface AssignmentMiniProps {
  id: number;
  name: string;
  visibility: boolean;
  deadlineDate: string;
  description: string;
  queryKey: string;
  isSubmitted?: boolean;
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
  yearStart: number;
  approvalStatus: number;
  owner: unknown;
};

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

export const downloadAllFiles = async (
  courseId: number,
  courseName: string,
): Promise<void> => {
  const res = await clientFetch(`/course/${courseId}/files`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to get file');
  }
  // Get the filename from the response headers if available
  const disposition = res.headers.get('Content-Disposition');
  let filename = courseName;
  if (disposition && disposition.indexOf('attachment') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }
  }

  // Convert the response to a Blob
  const blob = await res.blob();

  // Create a link element
  const link = document.createElement('a');

  // Create a URL for the Blob and set it as the href attribute
  const url = window.URL.createObjectURL(blob);
  link.href = url;

  // Set the download attribute with a filename
  link.download = filename;

  // Append the link to the body
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);

  // Revoke the URL created for the Blob
  window.URL.revokeObjectURL(url);
};
