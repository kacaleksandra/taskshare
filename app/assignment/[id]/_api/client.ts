import { clientFetch } from '@/app/_utils/client-fetch';

export interface AssignmentMiniProps {
  id: number;
  name: string;
  visible: boolean;
  deadlineDate: string;
  description: string;
  submissionId?: number;
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

type User = {
  email: string;
  id: number;
  lastname: string;
  name: string;
  roleId: number;
  statusId: number;
};

export type Submission = {
  files: Fajel[];
  id: number;
  lastEdit: string; // ISO date string
  studentComment: string;
  submissionDateTime: string; // ISO date string
  user: User;
};

type Fajel = {
  id: number;
  fileName: string
};

export const getAllSubmitions = async (
  assignmentID: number,
): Promise<Submission[]> => {
  const res = await clientFetch(`/submission/byassignment/${assignmentID}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to get submissions');
  } else {
    return res.json();
  }
};

export const getMySubmitions = async (
  submissionID: number,
): Promise<Submission> => {
  const res = await clientFetch(`/submission/${submissionID}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to get your submission');
  } else {
    return res.json();
  }
};

export const downloadFile = async (
  {
    submissionID,
    fileID,
    downloadedFileName,
  }:
  {
    submissionID : number,
    fileID: number,
    downloadedFileName: string,
  }
): Promise<void> => {
  const res = await clientFetch(`/submission/${submissionID}/file/${fileID}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to get file');
  }
  // Get the filename from the response headers if available
  const disposition = res.headers.get('Content-Disposition');
  let filename = downloadedFileName ?? 'downloaded-file';
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