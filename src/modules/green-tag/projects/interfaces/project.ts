export interface ProjectInterface {
  id?: string;
  name: string;
  url: string;
  logo: string;
}
export interface ProjectCreateInterface {
  id?: string;
  name: string;
  url: string;
  logo: File;
}
