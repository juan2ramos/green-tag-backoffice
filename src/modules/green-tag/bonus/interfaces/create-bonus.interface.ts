import { Project } from '../../compensation/interfaces/types';

export interface CreateBonus {
  url: string;
  urlBlockchain: string;
  co2Total: number;
  projectId: string;
}
export interface Bonus {
  id: string;
  url: string;
  urlBlockchain: string;
  co2Total: number;
  co2Compensated: number;
  project?: Project;
}
