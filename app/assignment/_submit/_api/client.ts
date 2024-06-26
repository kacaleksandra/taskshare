import { clientFetch } from '@/app/_utils/client-fetch';

interface submissionBody {
  assignmentID: number;
  studentComment: string;
}

interface submissionFile {
  submissionID: number;
  files: File[];
}

export const makeSubmission = async (
  submission: submissionBody,
): Promise<number> => {
  const res = await clientFetch(`/submission`, {
    method: 'POST',
    body: JSON.stringify(submission),
  });

  if (!res.ok) {
    throw new Error('Failed to get assignment info');
  } else {
    return res.json();
  }
};

export const submitFiles = async (data: submissionFile): Promise<{}> => {
  const formData = new FormData();
  for (const file of data.files) {
    formData.append('files', file);
  }
  const res = await clientFetch(`/submission/${data.submissionID}/files`, {
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to get assignment info');
  } else {
    return res;
  }
};

export const changeSubmission = async ({
  submissionID,
  studentComment,
}: {
  submissionID: number;
  studentComment: string;
}): Promise<void> => {
  const res = await clientFetch(`/submission/${submissionID}`, {
    method: 'PUT',
    body: JSON.stringify({ studentComment: studentComment }),
  });

  if (!res.ok) {
    throw new Error('Failed to change submission');
  } else {
    return;
  }
};

export const deleteFiles = async ({
  submissionID,
  fileID,
}: {
  submissionID: number;
  fileID: number;
}): Promise<{}> => {
  const res = await clientFetch(`/submission/${submissionID}/file/${fileID}`, {
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete file');
  } else {
    return res;
  }
};
