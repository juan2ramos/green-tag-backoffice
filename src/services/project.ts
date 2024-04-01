import { Project } from '../components/project/types';

const url = import.meta.env.VITE_API_URL;

export const getProject = async () => {
  try {
    const resp = await fetch(`${url}project`);
    if (!resp.ok) throw new Error('Failed to fetch project.');
    const json = await resp.json();
    return json?.payload;
  } catch (error) {
    console.error('Error fetching project', error);
    throw new Error('Error fetching project');
  }
};

export const createProject = async (data: Project) => {
  const formData = new FormData();
  formData.append(
    'file',
    data.file instanceof Blob ? data.file : JSON.stringify(data.file),
  );
  formData.append('name', data.name);
  formData.append('url', data.url);
  try {
    const resp = await fetch(`${url}project`, {
      method: 'POST',
      body: formData,
    });
    const json = await resp.json();
    console.log('json', json);

    if (!resp.ok) throw new Error(json);
    return json?.payload;
  } catch (error: Error | unknown) {
    throw new Error((error as Error)?.message);
  }
};
