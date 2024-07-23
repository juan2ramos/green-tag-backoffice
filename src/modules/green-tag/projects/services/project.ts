import { greenTagApi } from '@/api/green-tag-api';
import { ProjectCreateInterface } from '../interfaces/project';

export const getProjects = async () => {
  const { data } = await greenTagApi('project');
  return data?.payload;
};

export const createProject = async (project: ProjectCreateInterface) => {
  const formData = new FormData();
  formData.append('name', project.name);
  formData.append('url', project.url);
  formData.append('file', project.logo);
  const headers = { 'Content-Type': 'multipart/form-data' };
  const { data } = await greenTagApi.post('project', formData, { headers });
  return data?.payload;
};
